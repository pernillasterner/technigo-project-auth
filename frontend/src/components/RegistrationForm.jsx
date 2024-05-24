import { useState } from "react";
import { useLogin } from "../contexts/UserContext";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

export const RegistrationForm = () => {
  // Set starting point for handling user data
  const { registerUser } = useLogin();
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationData, setRegistrationData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    // Remove error message when start typing again
    setErrorMessage("");
    const { name, value } = e.target;

    // Add incoming letters to formData
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  // Send the request to /users with the updated form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      firstName,
      lastName,
      age,
      email,
      password,
      confirmPassword,
    } = registrationData;
    // Check if password is correct
    if (password !== confirmPassword) {
      // Add error message and return;
      setErrorMessage("The passwords are not identical");
      return;
    }

    // Send code to backend -> do some stuff using try and catch
    try {
      await registerUser({
        username,
        firstName,
        lastName,
        age,
        email,
        password,
      });

      // Redirect to login page
      navigate("/play");
    } catch (err) {
      console.error("Error registration user", err);
    }
  };

  return (
    <RegistrationContainer>
      <Form onSubmit={handleSubmit}>
        <Heading>Register</Heading>

        <label>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={registrationData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          <Input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={registrationData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          <Input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={registrationData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          <Input
            type="text"
            placeholder="Age"
            name="age"
            value={registrationData.age}
            onChange={handleChange}
          />
        </label>
        <label>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={registrationData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={registrationData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          <Input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={registrationData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button type="submit">Register</Button>
      </Form>
    </RegistrationContainer>
  );
};

const RegistrationContainer = styled.div`
  border-radius: 20px;
  max-width: fit-content;
  height: fit-content;
  padding-top: 80px;
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
  background-color: var(--ocean);
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
`;
