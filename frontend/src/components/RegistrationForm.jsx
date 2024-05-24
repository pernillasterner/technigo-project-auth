import { useState } from "react";
import { useLogin } from "../contexts/UserContext";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import styled from "styled-components";

export const RegistrationForm = () => {
  // Set starting point for handling user data

  // This method gives access to different form hooks
  const methods = useForm();
  const { registerUser } = useLogin();
  const [errorMessage, setErrorMessage] = useState("");

  // Destructes register, handleSubmit and errors from useForm
  const {
    register, // validation and tracking
    handleSubmit, // function that will run when the form is submitted
    formState: { errors }, // object with validation errors for each input field
  } = methods;

  const navigate = useNavigate();

  // Send the request to /users with the updated form data
  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    // Check if password is correct
    if (password !== confirmPassword) {
      // Add error message and return;
      setErrorMessage("The passwords are not identical");
      return;
    }

    // Send code to backend -> do some stuff using try and catch
    try {
      await registerUser(data);

      // Redirect to login page
      navigate("/play");
    } catch (err) {
      console.error("Error registration user", err);
    }
  };

  return (
    <RegistrationContainer>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* disables browser validation */}
          <Heading>Register</Heading>
          <label>
            <Input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username can only contain letters, numbers, and underscores",
                },
              })}
            />
            {errors.username && (
              <ErrorMessage>{errors.username.message}</ErrorMessage>
            )}
          </label>
          <label>
            <Input
              type="text"
              placeholder="First Name"
              {...register("firstName", {
                required: "First name is required",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "First name can only contain letters",
                },
              })}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}
          </label>
          <label>
            <Input
              type="text"
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last name is required",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Last name can only contain letters",
                },
              })}
            />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
          </label>
          <label>
            <Input
              type="text"
              placeholder="Age"
              {...register("age", {
                required: "Age is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Age must be a number",
                },
              })}
            />
            {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
          </label>
          <label>
            <Input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </label>
          <label>
            <Input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </label>
          <label>
            <Input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </label>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <Button type="submit">Register</Button>
        </Form>
      </FormProvider>
    </RegistrationContainer>
  );
};

const RegistrationContainer = styled.div`
  border-radius: 20px;
  max-width: fit-content;
  height: fit-content;
  padding-top: 80px;
  margin: 0 auto;

  @media (min-width: 700px) {
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

  @media (min-width: 700px) {
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
  color: #fff;
  font-size: 13px;
`;
