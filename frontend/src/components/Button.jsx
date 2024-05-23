import styled from "styled-components";

export const Button = styled.button`
  background-color: var(--raspberry);
  color: #fff;
  border-radius: 30px;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: 0.2s ease;
  text-decoration: none;
  margin-top: 20px;

  &:hover {
    background-color: var(--raspberryhover);
    cursor: pointer;
  }

  &:active {
    background-color: var(--raspberryactive);
  }
`;

export default Button;
