import { css } from "linaria";
import { styled } from "linaria/react";

export const Heading = styled("h2")``;

const colors = {
  muted: "#66788A"
};

const getColor = ({ color }) => {
  if (!color) {
    return "initial";
  }
  return colors[color] || color;
};

const textCss = `
  line-height: 20px;
  font-size: 14px;
`;

export const Label = styled("label")`
  font-weight: bold;
  ${textCss}
  color: ${getColor};
`;

export const Text = styled("span")`
  ${textCss}
  color: ${getColor};
`;

export const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
