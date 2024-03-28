import React from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";

type Props = {};

const Home = (props: Props) => {
  return (
    <HomePage>
      <Header />
      <PortfolioWrapper>
        {home_layouts.map((item, idx) => {
          return (
            <div>
              <Name>{item.name}</Name>
              <PortfolioContant>
                <PortfolioImg />
              </PortfolioContant>
            </div>
          );
        })}
      </PortfolioWrapper>
    </HomePage>
  );
};

export default Home;
const home_layouts = [
  {
    name: "서혜림",
  },
  {
    name: "박지혜",
  },
  {
    name: "이민서",
  },
];
const HomePage = styled.div`
  height: 100%;
`;
const PortfolioWrapper = styled.div`
  padding: 14rem 8.4rem 7.4rem 8.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;
const PortfolioContant = styled.div`
  background-color: #39bc56;
  border-radius: 1rem;
  padding: 2.5rem 9.9rem;
  width: 100%;
  height: 18rem;
  box-sizing: border-box;
`;
const PortfolioImg = styled.div`
  background-color: white;
  width: 100%;
  height: 13rem;
  border-radius: 1rem;
`;
const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  padding-bottom: 0.4rem;
`;
