import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

type Props = {};

type UserType = {
  email: string;
  id: number;
  introduction: string;
  nickname: string;
  password: string;
  userImgs: { imgSrc: string; userImgId: number }[];
};
const Home = (props: Props) => {
  const [userList, setUserList] = useState<UserType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/list`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setUserList(res.data.userList));

    return () => {};
  }, []);
  return (
    <Layout>
      <HomePage>
        <ProfileWrapper>
          {userList.map((item, idx) => {
            return (
              <ProfileContent key={idx}>
                {item.userImgs && item.userImgs.length > 0 ? (
                  <ProfileImg
                    style={{
                      backgroundImage: `url(${item.userImgs[0].imgSrc})`,
                    }}
                  />
                ) : (
                  <ProfileImg
                    style={{
                      backgroundImage: `url("./assets/join/profile.png")`,
                    }}
                  />
                )}

                <Nickname>{item.nickname}</Nickname>
                <Introduction>{item.introduction}</Introduction>
                <AllPortpolio
                  onClick={() => {
                    navigate(`/${item.id}/project`);
                  }}
                >
                  전체 포트폴리오 보기
                </AllPortpolio>
              </ProfileContent>
            );
          })}
        </ProfileWrapper>
      </HomePage>
    </Layout>
  );
};

export default Home;

const HomePage = styled.div`
  height: 100%;
`;
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 15rem;
  padding-top: 6.6rem;
  height: 100%;
`;
const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  gap: 1.2rem;
  align-items: center;
`;

const ProfileImg = styled.div`
  width: 20rem;
  height: 20rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50rem;
`;
const Nickname = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`;
const Introduction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  border: 1px solid #39bc56;
  width: 20rem;
  height: 10rem;
  border-radius: 1rem;
  text-align: center;
  padding: 0.5rem;
  text-align: center;
  padding: 0.5rem;
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
const AllPortpolio = styled.div`
  font-size: 1.6rem;
`;
