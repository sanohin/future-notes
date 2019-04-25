import { styled } from "linaria/react";

export const Input = styled("input")`
  box-sizing: border-box;
  width: 100%;
  border-radius: 3px;
  line-height: 16px;
  font-size: 12px;
  height: 32px;
  padding: 0px 10px;
  border: 1px solid gray;
  &::placeholder {
    color: lightgrey;
  }
`;
