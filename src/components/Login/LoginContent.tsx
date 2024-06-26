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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { showToast } from "../../styles/Toast";

const { naver } = window as any;

const NAVER_CLIENT_ID = process.env.REACT_APP_REST_NAVER_API_KEY;
const NAVER_CALLBACK_URL = process.env.REACT_APP_REDIRECT_NAVER_URI;

const naverLogin = new naver.LoginWithNaverId({
  clientId: NAVER_CLIENT_ID,
  callbackUrl: NAVER_CALLBACK_URL,
  isPopup: false,
  loginButton: { color: "green", type: 2, height: 58 },
  callbackHandle: true,
});

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
    // .matches(
    //   /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$ %^&*-]).{10,}$/,
    //   "비밀번호는 10자 이상이어야 하며, 영문 대문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다."
    // )
    .required("비밀번호를 입력해주세요."),
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
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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
    formState: { errors },
  } = useForm<User>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { mutate } = useLogin();
  const { login } = useContext(AuthContext);
  const [accessToken, setAcessToken] = useState<any>();
  const onSubmit = (data: User) => {
    mutate(data);
  };

  async function handleSocialKakao() {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_KAKAO_URI}&response_type=code`;
    window.location.href = link;
  }

  const userAccessToken = () => {
    setAcessToken(window.location.href.includes("access_token") && getToken());
  };

  const getUser = async () => {
    await naverLogin?.getLoginStatus(async (status: boolean) => {
      // console.log(status);
      if (status) {
        const userEmail = naverLogin.user.getEmail();
        const username = naverLogin.user.getNickName();
        console.log(naverLogin);
        // console.log({ email: userEmail, nickname: username ? username : null });
        if (userEmail || username) {
          try {
            const res = await axios.post(
              `${process.env.REACT_APP_API_URL}/user/login/naver/callback`,
              { email: userEmail, nickname: username ? username : null }
            );
            const { data } = res;
            login({
              token: data.token,
              user: {
                userId: data.userId,
                email: data.email,
                nickname: data.nickname,
              },
            });
            showToast({
              type: "success",
              message: "로그인 성공했습니다.",
            });
            navigate("/");
          } catch (error) {
            showToast({
              type: "error",
              message: "로그인 실패했습니다.",
            });
          }
        }
      }
    });
  };

  const getToken = () => {
    const t = window.location.href.split("=")[1].split("&")[0];
    localStorage.setItem("accessToken", t);
    return t;
  };

  useEffect(() => {
    naverLogin.init();
  }, []);

  useEffect(() => {
    userAccessToken();
  }, [naverLogin]);

  useEffect(() => {
    if (naverLogin && accessToken) getUser();
  }, [naverLogin, accessToken]);

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
          <div id="naverIdLogin" />
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
export default LoginContent;

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
  cursor: pointer;
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
