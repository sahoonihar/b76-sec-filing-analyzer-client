import { Card, Checkbox } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const CompanyCard = ({ title, description }) => (
  <StyledCard>
    <Checkbox>
      <Link href={`/company/${title}`} passHref>
        <h1>{title}</h1>
      </Link>
    </Checkbox>

    <p>{description}</p>
  </StyledCard>
);

export default CompanyCard;

const StyledCard = styled(Card)`
  height: 150px;
`;
