import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {};

const Header = (props: Props) => {
  const navigate = useNavigate();
  const onNavigate = () => {
    navigate("/login");
  };
  return (
    <StyledHeader>
      <Logowrapper>
        <LogoThin>TEAM</LogoThin>
        <Logo>PORTFOLIO</Logo>
      </Logowrapper>
      <Login onClick={onNavigate}>Login</Login>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  width: 100%;
  height: 66px;
  background-color: #39bc56;
  position: fixed;
  top: 0;
  left: 0;
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
const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 3.2rem;
  font-size: 1.8rem;
  font-weight: 700;
  background-color: white;
  color: #39bc56;
  border-radius: 5rem;
  cursor: pointer;
`;