import React from "react";
import { styled } from "linaria/react";

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const _FormWrapper = styled("div")`
  width: 450px;
  margin-top: 24px;
  padding: 36px 24px;
  display: grid;
  grid-gap: 24px;
  border: 1px solid gray;
`;

export const FormWrapper = ({ children }) => {
  return (
    <Center>
      <_FormWrapper>{children}</_FormWrapper>
    </Center>
  );
};

export const FieldsWrapper = styled("div")`
  display: grid;
  grid-gap: 12px;
`;

export const ButtonsWrapper = styled("div")`
  display: grid;
  margin-top: 12px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 12px;
`;
