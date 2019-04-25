import { styled } from "linaria/react";

export const Button = styled.button`
  padding: 8px 12px;
  border-radius: 3px;
  &:disabled {
    cursor: not-allowed;
  }
  &:not(disabled) {
    cursor: pointer;
  }
`;
