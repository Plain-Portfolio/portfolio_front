import React from "react";
import styled, { keyframes } from "styled-components";
import { Container } from "../CommonTag";
import { SectionCol, SectionRow } from "../SectionDirection";

type Props = {};

const DetailSkeleton = (props: Props) => {
  return (
    <ReadContainer>
      <ReadBorder>
        <ReadTitle></ReadTitle>
        <ReadContent>
          <SectionLeft>
            <Div></Div>
            <Div></Div>
            <Div></Div>
          </SectionLeft>
          <SectionRight>
            <Div></Div>
          </SectionRight>
        </ReadContent>
      </ReadBorder>
    </ReadContainer>
  );
};

export default DetailSkeleton;

const pulse = keyframes`
    0% {
        background-color:  #DEDEDE;
    }

    50% {
        background-color: #FCFCFC;
    }

    100% {
        background-color: #DEDEDE;
    }
`;

const ReadTitle = styled.h1`
  background-color: white;
  font-size: 3.2rem;
  padding: 2rem;
  animation: ${pulse} 2s infinite ease-in-out;
`;
const ReadContainer = styled(Container)`
  margin: 14rem 0;
`;
const ReadBorder = styled.div`
  width: 70%;
  min-height: 100vh;
  padding: 4.9rem 4.7rem;
  border-radius: 2.5rem;
  border: 1px solid ${({ theme }) => theme.darkgray};
  background-color: ${({ theme }) => theme.lightgray};
`;
const ReadContent = styled(SectionRow)`
  height: 92%;
  padding: 5rem 0;
  justify-content: space-between;
`;
const SectionLeft = styled(SectionCol)`
  flex-grow: 4;
  flex-basis: 40%;
  margin-right: 2rem;

  & > div:nth-of-type(1) {
    flex-grow: 3;
  }

  & > div:nth-of-type(2) {
    flex-grow: 1;
  }

  & > div:nth-of-type(3) {
    flex-grow: 6;
  }

  & > div:not(:first-child) {
    margin-top: 2rem;
  }
`;
const SectionRight = styled(SectionCol)`
  flex-grow: 6;
  flex-basis: 60%;
  padding: 2rem;
  background-color: white;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const Div = styled.div`
  background-color: white;
  animation: ${pulse} 2s infinite ease-in-out;
`;
