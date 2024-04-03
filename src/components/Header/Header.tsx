import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext, UserInfo } from "../Context/AuthContext";
import { showToast } from "../../styles/Toast";

type Props = {};

const Header = (props: Props) => {
  const navigate = useNavigate();

  const { isLoggedIn, userInfo, logout } = useContext(AuthContext);
  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(isLoggedIn);
  const [localUser, setLocalUser] = useState<UserInfo>();
  const onNavigate = (url: string) => {
    navigate(url);
  };

  const handleLogout = () => {
    logout();
    showToast({ type: "success", message: "로그아웃 성공하였습니다." });
  };

  useEffect(() => {
    setLocalUser(userInfo);
    setLocalIsLoggedIn(isLoggedIn);
  }, [isLoggedIn, userInfo]);

  return (
    <StyledHeader>
      <Logowrapper onClick={() => onNavigate("/")}>
        <LogoThin>TEAM</LogoThin>
        <Logo>PORTFOLIO</Logo>
      </Logowrapper>
      {localIsLoggedIn ? (
        <Logowrapper>
          {localUser && <UserEmail>{localUser.user.email}</UserEmail>}
          <PostLink onClick={() => onNavigate("/post")}>글쓰기</PostLink>
          <Login onClick={handleLogout}>Logout</Login>
        </Logowrapper>
      ) : (
        <Login onClick={() => onNavigate("/login")}>Login</Login>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  width: 100%;
  height: 6.6rem;
  background-color: #39bc56;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1.7rem 4rem;
  display: flex;
  gap: 1rem;
  color: white;
  justify-content: space-between;
  z-index: 1;
`;
const Logowrapper = styled.div`
  display: flex;
  gap: 1rem;
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
const PostLink = styled(Login)`
  border: 0.2rem solid white;
  color: white;
  background-color: ${({ theme }) => theme.color.mainGreen};
`;
const UserEmail = styled.span`
  font-size: 1.3rem;
`;
