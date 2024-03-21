import styled, { css } from "styled-components";
import LoginContent from "../components/LoginContent";

interface LoginTitleProps {
  $social?: boolean;
}

export default function Login() {
  return (
    <LoginContainer>
      <LoginForm>
        <LoginTitle>Login</LoginTitle>
        <GeneralLogin>
          <LoginContent />
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
      <LinkToJoin>
        아직 회원이 아니신가요? <a href="/join">회원가입하러가기</a>
      </LinkToJoin>
    </LoginContainer>
  );
}

const LoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 52.3rem;
  height: 55.2rem;
  border: 1px solid ${({ theme }) => theme.lightgray};
  border-radius: 2rem;
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

const GeneralLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > input:first-child {
    margin-bottom: 2.5rem;
  }
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

const LinkToJoin = styled.p`
  text-align: center;
  font-size: 1.6rem;
  margin-top: 1.3rem;

  & > a {
    text-decoration: underline;
    font-size: 1.6rem;
  }
`;
