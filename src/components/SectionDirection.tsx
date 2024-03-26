import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 2.7rem;
  }
`;

export const SectionRow = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;
export const SectionCol = styled(SectionRow)`
  flex-direction: column;

  & > p {
    padding: 1rem;
  }
`;
