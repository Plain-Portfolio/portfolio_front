import React from "react";
import styled from "styled-components";

type Props = {};

function Join({}: Props) {
  return (
    <JoinPage>
      <Header></Header>
      <Container>
        <Title>Sign up</Title>
        {join_layout.map((item, idx) => {
          return <Input></Input>;
        })}
      </Container>
    </JoinPage>
  );
}

export default Join;

const join_layout = [
  {
    subtitle: "nickname",
  },
  {
    subtitle: "password",
  },
  {
    subtitle: "email",
  },
];

const JoinPage = styled.div`
  height: 100%;
`;

const Header = styled.div`
  height: 87px;
  background-color: #39bc56;
`;
const Container = styled.div`
  width: 523px;
  height: 552px;
  border-radius: 28px;
  border: 1px solid #b5b3b3;
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: 900;
`;
const Input = styled.input``;
