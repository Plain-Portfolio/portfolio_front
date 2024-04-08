import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import axios from "axios";

type Props = {};

const Home = (props: Props) => {
  const [userInfo, setUserInfo] = useState(home_layouts);

  return (
    <HomePage>
      <Header type="Logout" />
      <PortfolioWrapper>
        {userInfo.map((item, idx) => {
          return (
            <div key={idx}>
              <Name>{item.name}</Name>
              <PortfolioContant>
                <LeftBtn></LeftBtn>
                <RightBtn></RightBtn>
                <ImgContent>
                  <Imgwrapper>
                    {item.img.map((img, idx) => {
                      return <PortfolioImg key={idx}>{img}</PortfolioImg>;
                    })}
                  </Imgwrapper>
                </ImgContent>
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
    img: [
      "준비된 포폴이 아직 없습니다1",
      "준비된 포폴이 아직 없습니다2",
      "준비된 포폴이 아직 없습니다3",
      "준비된 포폴이 아직 없습니다4",
      "준비된 포폴이 아직 없습니다5",
      "준비된 포폴이 아직 없습니다6",
      "준비된 포폴이 아직 없습니다7",
    ],
  },
  {
    name: "박지혜",
    img: [
      "준비된 포폴이 아직 없습니다1",
      "준비된 포폴이 아직 없습니다2",
      "준비된 포폴이 아직 없습니다3",
      "준비된 포폴이 아직 없습니다4",
      "준비된 포폴이 아직 없습니다5",
      "준비된 포폴이 아직 없습니다6",
      "준비된 포폴이 아직 없습니다7",
    ],
  },
  {
    name: "이민서",
    img: [
      "준비된 포폴이 아직 없습니다1",
      "준비된 포폴이 아직 없습니다2",
      "준비된 포폴이 아직 없습니다3",
      "준비된 포폴이 아직 없습니다4",
      "준비된 포폴이 아직 없습니다5",
      "준비된 포폴이 아직 없습니다6",
      "준비된 포폴이 아직 없습니다7",
    ],
  },
  {
    name: "이지은",
    img: [
      "준비된 포폴이 아직 없습니다1",
      "준비된 포폴이 아직 없습니다2",
      "준비된 포폴이 아직 없습니다3",
      "준비된 포폴이 아직 없습니다4",
      "준비된 포폴이 아직 없습니다5",
      "준비된 포폴이 아직 없습니다6",
      "준비된 포폴이 아직 없습니다7",
    ],
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
  padding: 1rem 6rem;
  width: 100%;
  height: 20rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;
const ImgContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const Imgwrapper = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  gap: 2rem;
`;
const PortfolioImg = styled.div`
  width: 27.3rem;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LeftBtn = styled.div`
  width: 6rem;
  height: 6rem;
  background-image: url("./assets/home/arrow.png");
  position: absolute;
  background-position: 163px 235px;
  top: 7rem;
  left: 0;
  cursor: pointer;
`;
const RightBtn = styled.div`
  width: 6rem;
  height: 6rem;
  background-image: url("./assets/home/arrow.png");
  position: absolute;
  background-position: -8px 109px;
  top: 7rem;
  left: 121.2rem;
  cursor: pointer;
`;

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  padding-bottom: 0.4rem;
`;
