import { css } from "linaria";
import { styled } from "linaria/react";

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row-reverse;
  padding: 8px 8px 0px;
`;

export const popoverContainer = css`
  box-shadow: rgba(67, 90, 111, 0.3) 0px 0px 1px,
    rgba(67, 90, 111, 0.47) 0px 8px 10px -4px;
  background: white;
`;
