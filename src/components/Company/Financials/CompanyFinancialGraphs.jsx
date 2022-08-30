/* eslint-disable security/detect-object-injection */
import { Line, Column } from '@ant-design/plots';
import { Tabs, Typography } from 'antd';
import { startCase } from 'lodash';
import styled from 'styled-components';

import graphablePrameters from '../../../data/graphableParameters.json';

const isGraphable = (type, title) => graphablePrameters[type].includes(title);

const CompanyFinancialGraphs = ({ title, type, data }) => {
  if (!data) return null;

  return (
    <Container>
      <Typography.Title level={3} style={{ color: 'white' }}>
        {title}
      </Typography.Title>

      <StyledTabs type="card">
        {Object.keys(data)
          .filter((key) => isGraphable(type, key))
          .map((key) => (
            <Tabs.TabPane key={key} tab={startCase(key)}>
              <StyledLine
                data={data[key]}
                xField="date"
                yField="value"
                seriesField="company"
                xAxis={{ type: 'time' }}
                slider={{
                  start: 0.7,
                  end: 1,
                }}
              />
            </Tabs.TabPane>
          ))}
      </StyledTabs>
    </Container>
  );
};

export const CompanyLexicalGraphs = ({ data, form }) => {
  if (!data) return null;

  return (
    <Container>
      <Typography.Title level={3} style={{ color: 'white' }}>
        Lexical analysis of {form} forms
      </Typography.Title>

      <StyledBar
        data={data}
        xField="metric"
        yField="value"
        seriesField="company"
      />
    </Container>
  );
};

export const CompanySimilarityGraphs = ({ data, form }) => {
  if (!data) return null;

  return (
    <Container>
      <Typography.Title level={3} style={{ color: 'white' }}>
        Similarity analysis of {form} forms
      </Typography.Title>

      <StyledTabs type="card">
        {Object.keys(data).map((type) => (
          <Tabs.TabPane key={type} tab={startCase(type)}>
            <StyledLine
              data={data[type]}
              xField="date"
              yField="value"
              seriesField="company"
              xAxis={{ type: 'time' }}
              slider={{
                start: 0.7,
                end: 1,
              }}
            />
          </Tabs.TabPane>
        ))}
      </StyledTabs>
    </Container>
  );
};

export default CompanyFinancialGraphs;

const Container = styled.div`
  padding: 0 1rem;
`;

const StyledLine = styled(Line)`
  background: #171a1d;
  padding: 1.5rem;
  border-radius: 1rem;
`;

const StyledBar = styled(Column)`
  background: #171a1d;
  padding: 1.5rem;
  border-radius: 1rem;
`;

const StyledTabs = styled(Tabs)`
  &.ant-tabs-card > .ant-tabs-nav {
    color: white;

    &::before {
      border: none;
    }

    .ant-tabs-tab {
      background: #2c343b;
      border: none;
      padding: 0.5rem;
      border-radius: 0.25rem;
      color: white;
      font-weight: 600;
      margin-right: 1rem;
    }

    .ant-tabs-tab-active {
      background: #5d5fef;

      .ant-tabs-tab-btn {
        color: white;
      }
    }
  }
`;
