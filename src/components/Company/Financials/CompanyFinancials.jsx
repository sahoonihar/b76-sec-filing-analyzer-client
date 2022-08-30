import { Layout, Menu } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

import CompanyFinancialGraphs from './CompanyFinancialGraphs';

const CompanyFinancials = ({ data }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('income-statement');

  const componentsSwitch = (key) => {
    switch (key) {
      case 'income-statement':
        return (
          <CompanyFinancialGraphs
            title="Income Statement"
            type="IncomeStatement"
            data={data.IncomeStatement}
          />
        );

      case 'balance-sheet':
        return (
          <CompanyFinancialGraphs
            title="Balance Sheet"
            type="BalanceSheet"
            data={data.BalanceSheet}
          />
        );

      case 'cash-flow':
        return (
          <CompanyFinancialGraphs
            title="Cash Flow"
            type="CashFlow"
            data={data.CashFlow}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Layout style={{ background: 'transparent' }}>
      <Layout.Sider style={{ background: 'transparent' }}>
        <StyledMenu onClick={(e) => setSelectedMenuItem(e.key)}>
          <Menu.Item key="income-statement">Income Statement</Menu.Item>
          <Menu.Item key="balance-sheet">Balance Sheet</Menu.Item>
          <Menu.Item key="cash-flow">Cash Flow</Menu.Item>
        </StyledMenu>
      </Layout.Sider>

      <Layout.Content>{componentsSwitch(selectedMenuItem)}</Layout.Content>
    </Layout>
  );
};

export default CompanyFinancials;

const StyledMenu = styled(Menu)`
  font-family: Poppins;
  font-size: 1rem;
  color: #7f868d;
  font-weight: 600;
  letter-spacing: 0.02rem;
  text-align: right;
  text-transform: uppercase;

  &.ant-menu {
    background: transparent;
    border-color: #2c343b;
    height: 100%;

    .ant-menu-item {
      background: transparent;
      border-radius: 0.25rem;

      &:hover {
        color: white;
      }
    }

    .ant-menu-item-selected {
      background: #0002;
      color: white;
    }
  }
`;
