import { styled } from "linaria/react";

export const Spinner = styled.div`
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #ccc;
    border-top-color: #07d;
    animation: spinner 0.6s linear infinite;
  }
`;
