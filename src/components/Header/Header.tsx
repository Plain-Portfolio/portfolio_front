import React from "react";
import styled from "styled-components";

type Props = {};

const Header = (props: Props) => {
  return <StyledHeader></StyledHeader>;
};

export default Header;

const StyledHeader = styled.div`
  width: 100%;
  height: 87px;
  background-color: #39bc56;
  position: fixed;
  top: 0;
  left: 0;
`;
