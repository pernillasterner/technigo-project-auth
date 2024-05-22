import styled from "styled-components";

export const RegistrationForm = () => {
  return (
    <RegistrationContainer>
      <Form method="POST" action="/users">
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="text" name="password" />
        </label>
        {/* TODO: Skapa komponent av button */}
        <Button type="submit">Submit</Button>
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

const Button = styled.button`
  background-color: #ff9102;
  color: #fff;
  border-radius: 30px;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
`;
