import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = { type: string };

const Header = ({ type }: Props) => {
  const navigate = useNavigate();
  const onNavigate = () => {
    if (type === "Login") {
      navigate("/login");
    } else if (type === "Join") {
      navigate("/join");
    } else {
      navigate("/");
    }
  };
  return (
    <StyledHeader>
      <Logowrapper>
        <LogoThin>TEAM</LogoThin>
        <Logo>PORTFOLIO</Logo>
      </Logowrapper>
      <ContentRight>
        {type === "Logout" ? (
          <>
            <Nickname>popo님</Nickname>
            <AddPost onClick={() => navigate("post")}>Add Post</AddPost>
          </>
        ) : null}
        <Auth onClick={onNavigate}>{type}</Auth>
      </ContentRight>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
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
`;
const ContentRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;
const Nickname = styled.div`
  color: white;
  font-size: 1.6rem;
  font-weight: 600;
`;
const AddPost = styled.button`
  color: white;
  border: 1px solid white;
  width: 11.5rem;
  height: 3.2rem;
  font-size: 1.8rem;
  font-weight: 700;
  border-radius: 5rem;
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
const Auth = styled.button`
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
`;
