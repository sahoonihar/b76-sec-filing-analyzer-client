/* eslint-disable security/detect-object-injection */
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

import { processLexical, processSimilarity } from '../../../utils/preprocess';
import {
  CompanyLexicalGraphs,
  CompanySimilarityGraphs,
} from '../Financials/CompanyFinancialGraphs';

const CompanySentiment = ({ data }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('lexical:10-K');

  const componentsSwitch = (key) => {
    const [type, form] = key.split(':');

    switch (type) {
      case 'lexical':
        return (
          <CompanyLexicalGraphs
            data={processLexical(data.Sentiment.lexical[form], data.Name)}
            form={form}
          />
        );

      case 'similarity':
        return (
          <CompanySimilarityGraphs
            data={processSimilarity(data.Sentiment.similarity[form], data.Name)}
            form={form}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Layout style={{ background: 'transparent' }}>
      <Layout.Sider style={{ background: 'transparent' }}>
        <StyledMenu onClick={(e) => setSelectedMenuItem(e.key)} mode="inline">
          <Menu.SubMenu key="lexical" title="Lexical">
            {Object.keys(data.Sentiment.lexical).map((type) => (
              <Menu.Item key={`lexical:${type}`}>{type}</Menu.Item>
            ))}
          </Menu.SubMenu>

          <Menu.SubMenu key="similarity" title="Similarity">
            {Object.keys(data.Sentiment.similarity).map((type) => (
              <Menu.Item key={`similarity:${type}`}>{type}</Menu.Item>
            ))}
          </Menu.SubMenu>

          {/* <Menu.Item key="lexical">Lexical</Menu.Item>
          <Menu.Item key="similarity">Similarity</Menu.Item> */}
        </StyledMenu>
      </Layout.Sider>

      <Layout.Content>{componentsSwitch(selectedMenuItem)}</Layout.Content>
    </Layout>
  );
};

export default CompanySentiment;

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

  .ant-menu-sub {
    background: transparent;
    color: #7f868d;
  }
`;
