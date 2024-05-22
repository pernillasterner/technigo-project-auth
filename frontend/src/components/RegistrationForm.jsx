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
      navigate("/login");
    } catch (err) {
      console.error("Error registration user", err);
    }
  };

  return (
    <RegistrationContainer>
      <Form onSubmit={handleSubmit}>
        <Heading>Register</Heading>

        <label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={registrationData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={registrationData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={registrationData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={registrationData.age}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={registrationData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={registrationData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
`;

const Heading = styled.h3`
  color: black;
`;
