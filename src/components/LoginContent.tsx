import { useState } from "react";
import styled from "styled-components";

function LoginContent() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <>
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButton type="submit" onClick={handleSubmit}>
        로그인하기
      </LoginButton>
    </>
  );
}

const Input = styled.input`
  border-radius: 2.5rem;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  background-color: ${({ theme }) => theme.inputColor};
  display: block;
  width: 42.8rem;
  height: 4.8rem;
  font-size: 1.3rem;
  padding: 0 1.2rem;

  &:focus {
    border: 0.1rem solid black;
  }
`;

const LoginButton = styled.button`
  width: 42.8rem;
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
