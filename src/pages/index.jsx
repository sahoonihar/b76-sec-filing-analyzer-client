import { Input, AutoComplete, Button, Alert } from 'antd';
import Head from 'next/head';
import Router from 'next/router';
import { useState } from 'react';
import {
  HiOutlineXCircle,
  HiPlusCircle,
  HiOutlineSearch,
} from 'react-icons/hi';
import styled from 'styled-components';

import { SearchSuggestions } from '../components/Search';
import companies from '../data/companies.json';

const find = (a, b) => a.toLowerCase().includes(b.toLowerCase());

const SearchItem = ({ item, onSelect }) => (
  <SearchItemContainer>
    <h5>{item.name}</h5>
    <StyledButton
      type="text"
      size="small"
      icon={<HiPlusCircle size="18" />}
      onClick={onSelect}
    >
      Add to compare
    </StyledButton>
  </SearchItemContainer>
);

const Home = () => {
  const [search, setSearch] = useState([]);
  const [options, setOptions] = useState([]);
  const [cart, setCart] = useState([]);

  const add = (target) => (event) => {
    event.stopPropagation();
    setCart((_cart) =>
      _cart.find((item) => item.cik === target.cik) ? _cart : [..._cart, target]
    );
  };

  const rem = (target) => (event) => {
    event.stopPropagation();
    setCart((_cart) => _cart.filter((item) => item.cik !== target.cik));
  };

  const handleSearch = async (value) => {
    setSearch(value);
    setOptions([]);
    if (value.length < 3) return;
    const results = companies
      .filter(
        (company) =>
          find(company.name, value) ||
          find(company.ticker, value) ||
          find(company.cik, value)
      )
      .map((res) => ({
        value: res.cik,
        label: <SearchItem item={res} onSelect={add(res)} />,
      }));

    setOptions(results);
  };

  const onSelect = (value) => {
    Router.push(`/company/${value}`);
  };

  const handleCompareRedirect = () => {
    const ciks = encodeURI(cart.map(({ cik }) => cik));
    Router.push(`/compare?ciks=${ciks}`);
  };

  return (
    <Container>
      <Head>
        <title>Search - Gatherf</title>
      </Head>

      <LeftSection>
        <Title>Gatherf.in</Title>

        <AutoComplete
          options={options}
          onSearch={handleSearch}
          onSelect={onSelect}
          value={search}
          notFoundContent={<SearchSuggestions />}
        >
          <StyledInput
            size="large"
            placeholder="Search for a company name, ID or type"
            allowClear
            maxLength={100}
            style={{ width: '40rem' }}
            prefix={<HiOutlineSearch size="18" />}
          />
        </AutoComplete>

        {/* <SearchPopular /> */}
      </LeftSection>

      <RightSection>
        <h1>Compare Bucket</h1>

        {cart.map((item) => (
          <CompareItemContainer key={item.cik}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.5rem',
              }}
            >
              <h2>{item.name}</h2>
              <span>{item.ticker}</span>
            </div>

            <StyledButton
              type="text"
              size="small"
              shape="circle"
              style={{ borderRadius: '0.25rem' }}
              icon={<HiOutlineXCircle size="24" />}
              onClick={rem(item)}
            />
          </CompareItemContainer>
        ))}

        {cart.length < 2 && (
          <Alert message="Select atleast 2 companies." type="error" />
        )}

        <StyledButton
          type="primary"
          style={{ borderRadius: '0.25rem' }}
          disabled={cart.length < 2}
          onClick={handleCompareRedirect}
        >
          Compare
        </StyledButton>
      </RightSection>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RightSection = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-left: 2px solid #2c343b;
  padding: 4rem 2rem;

  h1 {
    font-size: 1.25rem;
    font-family: Poppins, sans-serif;
    color: white;
  }
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
`;

const StyledInput = styled(Input)`
  height: 2.5rem;
  padding: 0 0.75rem;
  background: transparent;
  border: 2px solid gray;
  border-radius: 0.25rem;
  color: lightgray;

  .ant-input {
    color: white;
    font-size: 1.25rem;
    background: transparent;
    margin-left: 0.5rem;
  }

  .anticon-close-circle > svg {
    width: 0.75rem;
    height: 0.75rem;
    color: lightgray;
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #c7c7c7;
  border-radius: 0.25rem;
  text-transform: uppercase;

  &:hover {
    color: #f8f9fa;
    background: #2c343b;
  }
`;

const SearchItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0 0.5rem;
  height: 100%;

  h5 {
    margin: 0;
    color: #fff;
    font-size: 1.125rem;
    font-weight: 500;
  }

  .ant-btn {
    display: none;
  }

  &:hover {
    .ant-btn {
      display: flex;
    }
  }
`;

const CompareItemContainer = styled.div`
  background: #2c343b;
  border-radius: 0.25rem;
  padding: 1rem 0.75rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    color: white;
    margin: 0;
    font-size: 1.25rem;
  }
  span {
    color: #7f868d;
  }
`;
