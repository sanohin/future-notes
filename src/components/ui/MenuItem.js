import { css } from "linaria";
import { styled } from "linaria/react";

const colors = {
  danger: "#bf0e08"
};

export const MenuItem = styled.div`
  color: ${props => colors[props.intent] || "initial"};
  font-size: 14px;
  line-height: 20px;
  padding: 8px 16px;
  cursor: pointer;
  background-color: ${props =>
    props.selected ? "rgba(67, 90, 111, 0.08)" : "initial"};
  &:hover {
    background-color: rgba(67, 90, 111, 0.04);
  }
`;
