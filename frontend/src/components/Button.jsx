import styled from "styled-components";

export const Buttons = styled.button`
  background-color: #ff9102;
  color: #fff;
  border-radius: 30px;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: 0.2s ease;
  text-decoration: none;

  &:hover {
    background-color: #ffba5f;
    cursor: pointer;
  }

  &:active {
    background-color: #db7c00;
  }
`;
