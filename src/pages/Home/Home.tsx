import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import axios from "axios";

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
  console.log(userList);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
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
    <HomePage>
      <Header type="Logout" />
      <ProfileWrapper>
        {userList.map((item, idx) => {
          return (
            <ProfileContent key={idx}>
              {item.userImgs.length > 0 ? (
                <ProfileImg
                  style={{ backgroundImage: `url(${item.userImgs[0].imgSrc})` }}
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
              <AllPortpolio>전체 포트폴리오 보기</AllPortpolio>
            </ProfileContent>
          );
        })}
      </ProfileWrapper>
    </HomePage>
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
`;
const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
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
  box-sizing: border-box;
`;
const AllPortpolio = styled.div`
  font-size: 1.6rem;
  cursor: pointer;
`;
