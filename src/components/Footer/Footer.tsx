import styled from "styled-components";

type Props = {};

const Footer = (props: Props) => {
  return (
    <StyledHeader>
      <Logowrapper>
        <LogoThin>TEAM</LogoThin>
        <Logo>PORTFOLIO</Logo>
      </Logowrapper>
    </StyledHeader>
  );
};

export default Footer;

const StyledHeader = styled.div`
  width: 100%;
  height: 66px;
  background-color: #39bc56;
  padding: 1.7rem 4rem;
  display: flex;
  gap: 10px;
  color: white;
  justify-content: space-between;
`;
const Logowrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const LogoThin = styled.div`
  font-weight: 300;
  font-size: 3.5rem;
`;
const Logo = styled.div`
  height: 100%;
  font-weight: 600;
  font-size: 3.5rem;
`;
