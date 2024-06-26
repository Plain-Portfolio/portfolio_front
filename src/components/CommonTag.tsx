import styled from "styled-components";

const Input = styled.input`
  border-radius: 2.5rem;
  border: 1px solid ${({ theme }) => theme.color.inputBorder};
  background-color: ${({ theme }) => theme.color.inputColor};
  display: block;
  width: 100%;
  height: 4.8rem;
  font-size: 1.3rem;
  padding: 0 1.2rem;

  &:focus {
    border: 0.1rem solid black;
  }

  ${({ disabled, theme }) =>
    disabled && `background-color: ${theme.color.darkgray}`}
`;
const Button = styled.input`
  font-weight: 700;
  cursor: pointer;
  flex-basis: 10rem;
  border-radius: 1.5rem;
  border: none;
`;
const BorderButton = styled(Button)`
  background-color: white;
  border: 0.2rem solid ${({ theme }) => theme.color.mainGreen};
`;
const FillButton = styled(Button)`
  color: white;
  background-color: ${({ theme }) => theme.color.mainGreen};
  &:hover {
    background-color: ${({ theme }) => theme.color.darkGreen};
  }
`;

const Label = styled.label`
  font-size: 1.8rem;
  font-weight: 900;
  flex-basis: 20rem;
  flex-shrink: 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0.5rem 0;
  min-height: 3rem;
`;
const Item = styled.li<{ color?: string }>`
  height: 2.8rem;
  border-radius: 2rem;
  margin-right: 0.8rem;
  padding: 0.5rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.color.darkgry};
  line-height: 1.5rem;
  cursor: pointer;

  ${({ theme, color }) =>
    color &&
    `
    background-color: ${theme.color[color]}; 
    color: white;
  `}
`;

export {
  Input,
  Button,
  BorderButton,
  FillButton,
  Label,
  Container,
  List,
  Item,
};
