import styled from "styled-components";

const Input = styled.input`
  border-radius: 2.5rem;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  background-color: ${({ theme }) => theme.inputColor};
  display: block;
  width: 100%;
  height: 4.8rem;
  font-size: 1.3rem;
  padding: 0 1.2rem;

  &:focus {
    border: 0.1rem solid black;
  }
`;
const Button = styled.input`
  cursor: pointer;
  flex-basis: 10rem;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.mainGreen};
  border-radius: 1.5rem;
  font-weight: 900;
`;

export { Input, Button };
