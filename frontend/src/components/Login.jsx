import styled from "styled-components";
import { useState, useContext } from "react";
import { useLogin } from "../contexts/UserContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
        <heading>Login</heading>
        <label className="username">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="password">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button type="submit" className="loginBtn">
          Login
        </Button>
      </Form>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  background: #fff;
  border-radius: 20px;
  max-width: fit-content;
  height: fit-content;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Button = styled.button`
  background-color: #ff9102;
  color: #fff;
  border-radius: 30px;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
`;
