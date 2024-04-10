import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../CommonTag";
import { SectionCol } from "../SectionDirection";
import { LoginResponse, User } from "../../interfaces/IUser";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { showToast } from "../../styles/Toast";
// import NaverLogin from "./NaverLogin";

type ErrorCodesType = {
  [key in number]: string;
};

const ErrorCodes: ErrorCodesType = {
  402: "아이디 또는 비밀번호가 올바르지 않습니다.",
  403: "접근 권한이 없습니다.",
  404: "요청한 페이지를 찾을 수 없습니다.",
  500: "서버 오류입니다.",
};

interface LoginTitleProps {
  $social?: boolean;
}

const loginSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9_]+[A-Za-z0-9][@]{1}[A-Za-z0-9]+[A-Za-z0-9][.]{1}[A-Za-z]{1,3}$/,
      "이메일 형식을 맞춰서 입력해주세요."
    )
    .required("이메일을 입력해주세요."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .matches(
      /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$ %^&*-]).{10,}$/,
      "비밀번호는 10자 이상이어야 하며, 영문 대문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다."
    ),
});

const loginMutation = async (data: User) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/login`,
    data
  );
  return response.data as LoginResponse;
};

const getErrorMessage = (code: number) => {
  return ErrorCodes[code] || "알 수 없는 오류입니다.";
};

const useLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginSuccess = (data: LoginResponse) => {
    login({
      token: data.token,
      user: {
        userId: String(data.userId),
        email: data.email,
        nickname: data.nickname,
      },
    });
  };

  const { mutate } = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data: LoginResponse) => {
      handleLoginSuccess(data);

      showToast({
        type: "success",
        message: "로그인 성공했습니다.",
      });
      navigate("/");
    },
    onError: (error: any) => {
      const response = error.response as AxiosResponse;
      const code = response.data.code;
      const ErrorMessage = getErrorMessage(code);
      showToast({ type: "error", message: ErrorMessage });
      console.error("Login Error:", error);
    },
  });
  return { mutate };
};

function LoginContent() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors, isValid },
  } = useForm<User>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const { mutate } = useLogin();

  const onSubmit = (data: User) => {
    mutate(data);
  };
  async function handleSocialNaver() {
    // const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=CxtDFeqMnHFuBrnPCZKo&state=abcdef123456&redirect_uri=http://localhost:3000/user/login/naver/callback`;
    // window.location.href = link;
  }

  async function handleSocialKakao() {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_KAKAO_URI}&response_type=code`;
    window.location.href = link;
  }

  return (
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
      <LoginTitle>Login</LoginTitle>
      <GeneralLogin>
        <div style={{ width: "42.8rem" }}>
          <Label>email</Label>
          <Input
            id="email"
            type="text"
            placeholder="이메일을 입력하세요"
            {...register("email")}
          />
          <ValidationError>{errors.email?.message}</ValidationError>
          <Label>password</Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register("password")}
          />
          <ValidationError>{errors.password?.message}</ValidationError>
          <LoginButton type="submit">로그인하기</LoginButton>
        </div>
      </GeneralLogin>
      <SocialLogin>
        <Horizontal />
        <LoginTitle $social>social login</LoginTitle>
        <SocialIcons>
          {/* <NaverLogin /> */}
          {/* <SocialIcon
            onClick={handleSocialNaver}
            src="assets/login/naver_login.png"
            alt="naver"
          /> */}
          <SocialIcon
            onClick={handleSocialKakao}
            src="assets/login/kakao_login.png"
            alt="kakaoLogo"
          />
        </SocialIcons>
      </SocialLogin>
    </LoginForm>
  );
}
const ValidationError = styled.p`
  height: 2.5rem;
  text-align: left;
  padding-left: 1.2rem;
  padding-top: 0.5rem;
  color: red;
  font-size: 1.1rem;
`;

const LoginForm = styled.form`
  width: 52.3em;
  height: 55.2rem;
  border: 1px solid ${({ theme }) => theme.color.lightgray};
  border-radius: 2rem;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
`;

const LoginTitle = styled.h1<LoginTitleProps>`
  font-size: ${(props) => (props.$social ? "1.5rem" : "2.5rem")};
  position: ${(props) => (props.$social ? "absolute" : "static")};
  text-align: center;
  font-weight: bold;
  margin: 4.4rem 0 6.3rem;

  ${({ $social }) =>
    $social &&
    css`
      margin: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 0;
      background: white;
      padding: 0 0.7rem;
    `}
`;

const GeneralLogin = styled(SectionCol)`
  align-items: center;
`;

const SocialLogin = styled.div`
  position: relative;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SocialIcon = styled.img`
  width: 11rem;
  height: auto;
  object-fit: cover;
  overflow: hidden;
  border-radius: 5rem;
`;

const Horizontal = styled.hr`
  width: 42.8rem;
  height: 0.1rem;
  border: 0;
  margin-top: 3.2rem;
  margin-bottom: 3.9rem;
  background: ${({ theme }) => theme.color.darkgray};
  background: ${({ theme }) => theme.color.darkgray};
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 900;
  padding-left: 1rem;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 4.8rem;
  border-radius: 1rem;
  margin-top: 2.5rem;
  background-color: ${({ theme }) => theme.color.mainGreen};
  color: #fff;
  font-weight: bold;
  font-size: 2rem;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.color.darkGreen};
    transition: background 0.2s ease-in-out;
  }
`;

export default LoginContent;
