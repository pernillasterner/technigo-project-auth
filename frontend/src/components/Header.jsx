import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../contexts/UserContext";
import signoutIcon from "/src/assets/signouticon.png";

export const Header = () => {
  const { authenticated, signout } = useLogin();

  if (authenticated.auth) {
    return (
      <HeaderContainer>
        <LoggedIn className="loggedIn">
          <Link to={`/play`}>
            <Play>Play</Play>
          </Link>
          <Link to={`/myprogress`}>
            <MyProgress>My progress</MyProgress>
          </Link>
          <SignOut>
          <SignOutText onClick={signout}>Sign out</SignOutText>
          <SignOutIcon onClick={signout} src={signoutIcon}/> 
          </SignOut>
        </LoggedIn>
      </HeaderContainer>
    );
  } else {
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
      </HeaderContainer>
    );
  }
};

const HeaderContainer = styled.div`
  background-color: var( --sunset);
  width: 100%;
  height: 30px;
  position: absolute;
  margin: -8px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  font-weight: 500;
`;

const StartPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100vh;
`;

const Register = styled.p`
  color: var( --ocean);
  cursor: pointer;

  &:hover {
    color: var( --oceanhover);
  }

  &:active {
    color: var( --oceanactive);
  }
`;

const Login = styled.p`
   color: var( --ocean);
  cursor: pointer;

  &:hover {
    color: var( --oceanhover);
  }

  &:active {
    color: var( --oceanactive);
  }
`;

const LoggedIn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  width: 100vh;
  color: white;
  
`;

const Play = styled.p`
  color: var( --ocean);
  cursor: pointer;

  &:hover {
    color: var( --oceanhover);
  }

  &:active {
    color: var( --oceanactive);
  }
`;

const MyProgress = styled.p`
  color: var( --ocean);
  cursor: pointer;
  
   &:hover {
    color: var( --oceanhover);
  }

  &:active {
    color: var( --oceanactive);
  }
`;

const SignOut = styled.div`
  display: flex;
  justify-content: center;
  gap: 7px;
  cursor: pointer;

   &:hover {
    opacity: 70%;
  }
`;

const SignOutText = styled.p`
  color: var( --ocean);
  cursor: pointer;


  &:active {
    color: var( --oceanactive);
  }
`;

const SignOutIcon = styled.img`
  width: 17px;
  height: 22px;
  align-items: center;
  padding-top: 17px;
  opacity: 100%;
  
  
 
`;

