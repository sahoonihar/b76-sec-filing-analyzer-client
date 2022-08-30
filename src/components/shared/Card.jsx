import { Card } from 'antd';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  border-radius: 0.25rem;
  background: #2c343b;

  .ant-card-body {
    padding: 1rem;
  }

  h2 {
    color: #7f868d;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  h3 {
    color: #8a8cf5;
    font-size: 1.25rem;
  }

  h4 {
    color: white;
    font-size: 1rem;
    font-weight: bold;
  }

  p {
    color: #cbd1d8;
    margin: 0;
  }
`;

export default StyledCard;
