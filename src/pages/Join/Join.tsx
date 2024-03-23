import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import JoinInputSection from "../../components/JoinInputSection/JoinInputSection";
import { useNavigate } from "react-router-dom";
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
  /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$ %^&*-]).{10,}$/;
const Join = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: "",
    email: "",
    password: "",
    pwConfirm: "",
  });

  const CheckValid = useCallback((type: string, value: string) => {
    if (type === "nickname" && value.length > 0 && value.length < 2)
      return true;
    if (type === "email" && value.length > 0 && !emailRegExp.test(value))
      return true;
    if (type === "password" && value.length > 0 && !passwordRegExp.test(value))
      return true;
    if (type === "pwConfirm" && value !== userInfo.password) return true;
    return false;
  }, []);
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
  const onNavigate = () => {
    navigate("/login");
  };
  return (
    <JoinPage>
      <Header />
      <Wrapper>
        <Container>
          <Title>Sign up</Title>
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
          <JoinButton>회원가입하기</JoinButton>
          <SocialTitleWrapper>
            <Line />
            <SocialTitle>social signup</SocialTitle>
            <Line />
          </SocialTitleWrapper>
          <SocialContent>
            <Social />
            <Social />
          </SocialContent>
          <LoginNavWrapper>
            회원이신가요?
            <LoginNav onClick={onNavigate}>로그인하러가기</LoginNav>
          </LoginNavWrapper>
        </Container>
      </Wrapper>
    </JoinPage>
  );
};

export default Join;

const joinLayout = [
  {
    subtitle: "nickname",
    placeholder: "nickname",
    textType: "text",
    errorMsg: "닉네임을 2자이상 입력해주세요",
  },
  {
    subtitle: "email",
    placeholder: "email",
    textType: "email",
    errorMsg: "이메일 형식이 올바르지 않습니다",
  },
  {
    subtitle: "password",
    placeholder: "password",
    textType: "password",
    errorMsg: "10자이상의 영문 대/소문자, 숫자, 특수문자 조합으로 가능합니다",
  },
  {
    subtitle: "pwConfirm",
    placeholder: "pwConfirm",
    textType: "password",
    errorMsg: "비밀번호가 일치하지 않습니다",
  },
];

const JoinPage = styled.div`
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Container = styled.div`
  width: 523px;
  height: 700px;
  border-radius: 28px;
  border: 1px solid #b5b3b3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 31px;
  margin-top: 87px;
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: 900;
`;

const JoinButton = styled.button`
  width: 428px;
  height: 48px;
  border: unset;
  background-color: #39bc56;
  color: white;
  font-size: 18px;
  font-weight: 700;
  border-radius: 25px;
`;
const SocialTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Line = styled.div`
  height: 0;
  width: 160px;
  border: 1px solid #d3d3d3;
`;
const SocialTitle = styled.div`
  font-size: 16px;
  padding: 0px 10px;
`;
const LoginNavWrapper = styled.div`
  font-size: 16px;
`;
const LoginNav = styled.a`
  font-size: 16px;
  padding-left: 5px;
  cursor: pointer;
`;
const SocialContent = styled.div`
  display: flex;
  gap: 45px;
`;
const Social = styled.div`
  width: 56px;
  height: 56px;
  background-color: #d9d9d9;
  border-radius: 50%;
`;
