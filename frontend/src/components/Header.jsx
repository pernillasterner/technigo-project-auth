import styled from "styled-components";

export const Header = () => {
  return (
    <HeaderContainer>
      <Register>Register here</Register>
      <Login>Log in</Login>
      <Play>Play</Play>
      <MyProgress>My progress</MyProgress>
      <SignOut>Sign out</SignOut>
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
