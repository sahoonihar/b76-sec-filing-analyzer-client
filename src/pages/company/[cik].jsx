import { Button, Tabs } from 'antd';
import axios from 'axios';
import { isEmpty } from 'lodash';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import styled from 'styled-components';

import CompanyFinancials from '../../components/Company/Financials/CompanyFinancials';
import CompanyOverview from '../../components/Company/Overview/CompanyOverview';
import CompanySentiment from '../../components/Company/Sentiment/CompanySentiment';
import Loader from '../../components/shared/Loader';
import { getCompanyByCik } from '../../utils/getCompanyByCik';
import { preprocessData } from '../../utils/preprocess';

const Company = () => {
  const router = useRouter();
  const [company, setCompany] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      const { cik } = router.query;
      const result1 = getCompanyByCik(cik);
      if (!result1.cik) return;
      setCompany(result1);

      try {
        const result2 = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/api/company/${cik}`
        );
        const companyDataTemp = preprocessData(result2.data);
        setCompanyData(companyDataTemp);
      } catch (error) {
        // console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [router]);

  if (loading) return <Loader fixed />;
  if (!company.cik || isEmpty(companyData)) return <Error statusCode="404" />;

  return (
    <MainContainer>
      <Head>
        <title>{company.name} - Gatherf</title>
      </Head>

      <BackButton type="text" onClick={() => router.push('/')}>
        <HiOutlineChevronLeft size="18" />
        Back
      </BackButton>

      <Heading>
        <h1>{company.name}</h1>
        <h2>{company.ticker}</h2>
      </Heading>

      <StyledTabs defaultActiveKey="overview" centered>
        <Tabs.TabPane tab="Overview" key="overview">
          <CompanyOverview
            name={companyData.Name}
            company={company}
            companyData={companyData}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Financials" key="financials">
          <CompanyFinancials data={companyData} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Sentiment" key="sentiment">
          <CompanySentiment data={companyData} />
        </Tabs.TabPane>
      </StyledTabs>
    </MainContainer>
  );
};

export default Company;

const StyledTabs = styled(Tabs)`
  color: #f8f9fa;

  .ant-tabs-nav::before {
    border-color: #2c343b;
  }
`;

const MainContainer = styled.div`
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
    font-size: 2.75rem;
    color: #f8f9fa;
  }

  h2 {
    color: #7f868d;
    font-weight: 600;
    font-size: 1.5rem;
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
