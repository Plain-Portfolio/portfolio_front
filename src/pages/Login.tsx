import styled from "styled-components";
import LoginContent from "../components/LoginContent";
import Header from "../components/Header/Header";

export default function Login() {
  return (
    <LoginContainer>
      <Header type="Join" />
      <LoginContent />
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
  min-height: 100vh;
  padding: 14rem 0 7.4rem 0;
`;

const LinkToJoin = styled.p`
  text-align: center;
  font-size: 1.6rem;
  margin-top: 1.3rem;
  color: ${({ theme }) => theme.darkgray};
  & > a {
    text-decoration: underline;
    font-size: 1.6rem;
  }
`;
