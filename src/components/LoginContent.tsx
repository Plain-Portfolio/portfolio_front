import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Input } from "./CommonTag";
import { SectionCol } from "./SectionDirection";

interface LoginTitleProps {
  $social?: boolean;
}
interface User {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup
    .string()
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "이메일 형식을 맞춰서 입력해주세요.")
    .required("이메일을 입력해주세요."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      "비밀번호는 10자 이상이어야 하며, 영문 대문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다."
    )
    .min(10, "비밀번호는 최소 10자 이상이어야 합니다."),
});

function LoginContent() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors, isValid },
  } = useForm<User>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const { mutate, isError, error, isSuccess } = useMutation({
    mutationFn: (user: User) =>
      fetch("/user/login", {
        method: "POST",
        body: JSON.stringify({ ...user }),
      }),
    onSuccess: (data) => {
      console.log("성공");
      console.log(data);
      //localStorage.setItem("accessToken", res.token);
      // return data;
    },
    onError: (error) => {
      console.log("실패", error);
      toast.warning("이메일과 비밀번호를 확인해주세요");
    },
  });

  const onSubmit = async (data: User) => {
    const res = mutate(data);
    console.log(res);
  };

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
          <SocialIcon />
          <SocialIcon />
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
  border: 1px solid ${({ theme }) => theme.lightgray};
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

const SocialIcon = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 3rem;
  background: ${({ theme }) => theme.darkgray};
`;

const Horizontal = styled.hr`
  width: 42.8rem;
  height: 0.1rem;
  border: 0;
  margin-top: 3.2rem;
  margin-bottom: 3.9rem;
  background: ${({ theme }) => theme.darkgray};
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
  background-color: ${({ theme }) => theme.mainGreen};
  color: #fff;
  font-weight: bold;
  font-size: 2rem;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.darkGreen};
    transition: background 0.2s ease-in-out;
  }
`;

export default LoginContent;
