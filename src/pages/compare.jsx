/* eslint-disable security/detect-object-injection */
import { Button, Tabs } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { MdOutlineCompareArrows } from 'react-icons/md';
import styled from 'styled-components';

import CompanyFinancials from '../components/Company/Financials/CompanyFinancials';
import Loader from '../components/shared/Loader';
import { getCompanyByCik } from '../utils/getCompanyByCik';
import { combineData, preprocessData } from '../utils/preprocess';

const TabCompareHeading = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <MdOutlineCompareArrows size="18" />
    <span>Comparison</span>
  </div>
);

const Compare = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [compareData, setCompareData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { ciks } = router.query;

      const companiesTemp =
        ciks?.split(',')?.map((cik) => getCompanyByCik(cik)) ?? [];
      setCompanies(companiesTemp);

      try {
        const results = await Promise.all(
          companiesTemp.map((company) =>
            axios
              .get(`${process.env.NEXT_PUBLIC_API}/api/company/${company.cik}`)
              .then((response) => response.data)
          )
        );

        const dataCombined = combineData(
          ...companiesTemp.map((company, idx) => preprocessData(results[idx]))
        );

        setCompareData(dataCombined);
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.query]);

  if (loading) return <Loader fixed />;

  return (
    <Container>
      <Head>
        <title>Compare Companies - Gatherf</title>
      </Head>

      <BackButton type="text" onClick={() => router.push('/')}>
        <HiOutlineChevronLeft size="18" />
        Back
      </BackButton>

      <Heading>
        {companies.map((company, idx) => (
          <div key={company.cik} className="compare-heading-container">
            <h1>{company.name}</h1>
            {idx + 1 < companies.length && <span>v/s</span>}
          </div>
        ))}

        <span>Back</span>
      </Heading>

      <StyledTabs defaultActiveKey="comparison" centered>
        <Tabs.TabPane tab={<TabCompareHeading />} key="comparison">
          <CompanyFinancials data={compareData} />
        </Tabs.TabPane>
      </StyledTabs>
    </Container>
  );
};

export default Compare;

const Container = styled.div`
  padding: 2rem 0;
`;

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;

  h1 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 2rem;
    color: #f8f9fa;
    margin: 0 0.25rem;
  }

  .compare-heading-container {
    display: flex;
    align-items: baseline;

    span {
      font-size: 1.5rem;
      margin: 0 0.5rem 0 1rem;
      color: #7f868d;
    }
  }
`;

const StyledTabs = styled(Tabs)`
  color: #f8f9fa;

  .ant-tabs-nav::before {
    border-color: #2c343b;
  }
`;

const BackButton = styled(Button)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0.5rem;
  left: 0.5rem;
  gap: 0.5rem;
  font-size: 1rem;
  color: #7f868d;
  border-radius: 0.25rem;
  padding: 1rem 0.5rem 1rem 0.25rem;

  &:hover {
    color: #f8f9fa;
    background-color: #2c343b;
  }
`;
