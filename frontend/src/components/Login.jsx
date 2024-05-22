import styled from "styled-components";
import { useState } from "react";
import { useLogin } from "../contexts/UserContext";
import { Button } from "./Button";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
        <Heading>Login</Heading>
        {error && <Error>{error}</Error>}
        <label className="username">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="password">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

const Heading = styled.h3`
  color: black;
`;

const Error = styled.h3`
  color: black;
`;
