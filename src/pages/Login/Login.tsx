import styled from "styled-components";
import LoginContent from "../../components/Login/LoginContent";
import Layout from "../../components/Layout/Layout";

export default function Login() {
  return (
    <Layout>
      <LoginContainer>
        <LoginContent />
        <LinkToJoin>
          아직 회원이 아니신가요? <a href="/join">회원가입하러가기</a>
        </LinkToJoin>
      </LoginContainer>
    </Layout>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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
