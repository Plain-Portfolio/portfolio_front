import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import JoinInputSection from "../../components/JoinInputSection/JoinInputSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../styles/Toast";

type UserInfo = {
  [key: string]: string;
  nickname: string;
  email: string;
  password: string;
  pwConfirm: string;
};
const emailRegExp =
  /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
const passwordRegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,}$/;

const Join = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: "",
    email: "",
    password: "",
    pwConfirm: "",
  });

  const CheckAll = useCallback(() => {
    const { nickname, email, password, pwConfirm } = userInfo;
    if (
      nickname.length > 2 &&
      emailRegExp.test(email) &&
      passwordRegExp.test(password) &&
      pwConfirm === password
    )
      return false;
    return true;
  }, [userInfo]);

  const CheckValid = useCallback(
    (type: string, value: string) => {
      if (type === "nickname" && value.length > 0 && value.length < 2)
        return true;
      if (type === "email" && value.length > 0 && !emailRegExp.test(value))
        return true;
      if (
        type === "password" &&
        value.length > 0 &&
        !passwordRegExp.test(value)
      )
        return true;
      if (
        type === "pwConfirm" &&
        value.length > 0 &&
        value !== userInfo.password
      )
        return true;

      return false;
    },
    [userInfo]
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const type = event.currentTarget.dataset.type;
      const value = event.target.value;
      if (type) {
        const clone = Object.assign({}, userInfo);
        clone[type] = value;
        setUserInfo(clone);
      }
    },
    [userInfo]
  );
  const onJoin = useCallback(async () => {
    if (!CheckAll()) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/user/signup`, {
          email: userInfo.email,
          password: userInfo.password,
          nickname: userInfo.nickname,
        })
        .then((res) => {
          if (res.data.id) {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.data.status === 1002) {
            showToast({ type: "error", message: "닉네임이 중복되었습니다." });
          } else if (error.response.data.status === 1001) {
            showToast({ type: "error", message: "이메일이 중복되었습니다." });
          }
        });
    }
  }, [userInfo.nickname, userInfo.email, userInfo.password, CheckAll]);
  return (
    <JoinPage>
      <Header type="Login" />
      <Wrapper>
        <Container>
          <Title>Signup</Title>
          {joinLayout.map(
            ({ subtitle, placeholder, textType, errorMsg }, idx) => {
              return (
                <JoinInputSection
                  onChange={onChange}
                  value={userInfo[subtitle]}
                  type={subtitle}
                  textType={textType}
                  placeholder={placeholder}
                  key={idx}
                  errorMsg={errorMsg}
                  isError={CheckValid(subtitle, userInfo[subtitle])}
                />
              );
            }
          )}
          <JoinButton onClick={onJoin} disabled={CheckAll()}>
            회원가입하기
          </JoinButton>
          <SocialTitleWrapper>
            <Line />
            <SocialTitle>social signup</SocialTitle>
            <Line />
          </SocialTitleWrapper>
          <SocialContent>
            <Social />
            <Social />
          </SocialContent>
        </Container>
      </Wrapper>
    </JoinPage>
  );
};

export default Join;

const joinLayout = [
  {
    subtitle: "nickname",
    placeholder: "닉네임을 입력해주세요",
    textType: "text",
    errorMsg: "닉네임을 2자이상 입력해주세요",
  },
  {
    subtitle: "email",
    placeholder: "이메일을 입력해주세요",
    textType: "email",
    errorMsg: "이메일 형식이 올바르지 않습니다",
  },
  {
    subtitle: "password",
    placeholder: "비밀번호를 입력해주세요",
    textType: "password",
    errorMsg: "영문 대문자/특수문자/숫자 포함 10자리 이상",
  },
  {
    subtitle: "pwConfirm",
    placeholder: "비밀번호를 재입력해주세요",
    textType: "password",
    errorMsg: "비밀번호가 일치하지 않습니다",
  },
];

const JoinPage = styled.div`
  height: 100%;
`;

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 14rem 0 7.4rem 0;
`;
const Container = styled.div`
  width: 52.3rem;
  height: 70rem;
  border-radius: 2.8rem;
  border: 0.1rem solid #b5b3b3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 0 4.8rem;
  box-sizing: border-box;
  box-shadow: 0.2rem 0.2rem 0.8rem rgba(0, 0, 0, 0.3);
`;
const Title = styled.div`
  font-size: 3rem;
  font-weight: 900;
`;

const JoinButton = styled.button`
  width: 100%;
  height: 4.8rem;
  border: unset;
  /* background-color: #39bc56; */
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  border-radius: 1rem;
  cursor: pointer;
  background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#39bc56")};
`;
const SocialTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 1.5rem;
`;
const Line = styled.div`
  height: 0;
  width: 100%;
  border: 0.1rem solid #d3d3d3;
`;
const SocialTitle = styled.div`
  font-size: 1.6rem;
  padding: 0rem 1rem;
`;
// const LoginNavWrapper = styled.div`
//   font-size: 1.6rem;
//   padding-top: 1.5rem;
// `;
// const LoginNav = styled.a`
//   font-size: 1.6rem;
//   padding-left: 0.5rem;
//   cursor: pointer;
//   text-decoration: underline;
// `;
const SocialContent = styled.div`
  display: flex;
  gap: 4.5rem;
`;
const Social = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  background-color: #d9d9d9;
  border-radius: 50%;
`;
