import { Alert } from 'antd';
// import { HiOutlineClock, HiOutlineStar, HiOutlineTable } from 'react-icons/hi';
import styled from 'styled-components';

export const SearchPopular = () => (
  <Container>
    <span>Popular searches:</span>

    <div>
      <h3>Apple</h3>
      <h3>Microsoft</h3>
      <h3>Google</h3>
      <h3>Amazon</h3>
    </div>
  </Container>
);

// const companies = ['Apple Inc', 'Meta Inc', 'Alphabet Inc', 'Microsoft Inc'];

export const SearchSuggestions = () => (
  <SearchSuggestionsContainer>
    <Alert message="Type atleast 3 letters." type="error" />

    {/* <Section>
      <SubSection>
        <h3>
          <HiOutlineClock size="14" />
          Recent:
        </h3>
        {companies.map((company) => (
          <span key={company}>{company}</span>
        ))}
      </SubSection>

      <SubSection>
        <h3>
          <HiOutlineStar size="14" />
          Popular:
        </h3>
        {companies.map((company) => (
          <span key={company}>{company}</span>
        ))}
      </SubSection>

      <SubSection>
        <h3>
          <HiOutlineTable size="14" />
          All companies:
        </h3>

        {companies.map((company) => (
          <span key={company}>{company}</span>
        ))}

        <h5 style={{ textDecoration: 'underline' }}>See More</h5>
      </SubSection>
    </Section> */}
  </SearchSuggestionsContainer>
);

const SearchSuggestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #2c343b;
  height: 100%;
  padding: 0.5rem 1rem;
`;

// const Section = styled.div`
//   display: flex;
//   gap: 3rem;
// `;

// const SubSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   font-family: Lato;
//   color: #cbd1d8;

//   h3,
//   h5 {
//     color: #7f868d;
//     display: flex;
//     gap: 0.25rem;
//     align-items: center;
//   }
// `;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  color: white;

  span {
    color: gray;
    font-size: 1rem;
    margin-right: 1rem;
  }

  h3 {
    margin: 0.25rem;
    color: white;

    font-size: 18px;
    line-height: 25px;
    color: #cbd1d8;
  }

  div {
    display: flex;
  }
`;
