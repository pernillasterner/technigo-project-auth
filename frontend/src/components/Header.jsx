import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  return (
    <HeaderContainer>
      <StartPage className="startPage">
        <Link to={`/register`}>
          <Register>Register here</Register>
        </Link>
        <Link to={`/login`}>
          <Login>Log in</Login>
        </Link>
      </StartPage>
      <LoggedIn className="loggedIn">
        <Link to={`/play`}>
          <Play>Play</Play>
        </Link>
        <Link to={`/myprogress`}>
          <MyProgress>My progress</MyProgress>
        </Link>
        <SignOut>Sign out</SignOut>
      </LoggedIn>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 30px;
  opacity: 80%;
  position: absolute;
  margin: -8px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const StartPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100vh;
`;

const Register = styled.p`
  color: white;
  cursor: pointer;

  &:hover {
    color: #fff9;
  }
`;

const Login = styled.p`
  color: white;
  cursor: pointer;

  &:hover {
    color: #fff9;
  }
`;

const LoggedIn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  width: 100vh;
`;

const Play = styled.p`
  color: white;
  cursor: pointer;

  &:hover {
    color: #fff9;
  }
`;

const MyProgress = styled.p`
  color: white;
  cursor: pointer;

  &:hover {
    color: #fff9;
  }
`;

const SignOut = styled.p`
  color: white;
  cursor: pointer;

  &:hover {
    color: #fff9;
  }
`;
