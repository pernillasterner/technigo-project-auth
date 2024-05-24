import styled from "styled-components";
import { useState } from "react";
import { useLogin } from "../contexts/UserContext";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate("/play");
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
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="password">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <Button type="submit" className="loginBtn">
          Log in
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

    @media (min-width: 700px){
    padding-top: 50px;
    
}
`;

const Heading = styled.h1`
  color: var(--vanilla);
  text-align: center;
  margin-top: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: var(--teal);
  border-radius: 20px;

    @media (min-width: 700px){
    padding: 2rem 2.5rem;
    
}
`;

const Input = styled.input`
  border-radius: 20px;
  padding: 10px 30px;
  border: none;
  background-color: var(--vanilla);
`;

const Error = styled.h3`
  color: black;
`;
