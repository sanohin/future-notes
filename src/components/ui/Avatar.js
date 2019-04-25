// @flow
import * as React from "react";
import { styled } from "linaria/react";

const Image = styled.img`
  height: 100%;
  width: auto;
  position: absolute;
`;

const Wrapper = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.size / 2}px;
  text-transform: uppercase;
  background: pink;
  position: relative;
`;

type AvatarProps = {
  src?: string,
  name?: string,
  size?: number
};

const getPlaceholder = (name: ?string): string => {
  if (!name) {
    return "";
  }
  let [fName, sName] = name.split(" ");
  if (sName) {
    return fName.charAt(0) + sName.charAt(0);
  }
  [fName, sName] = name.split("@");
  if (sName) {
    return fName.charAt(0) + sName.charAt(0);
  }
  return name.charAt(0);
};

export function Avatar({ name, src, size = 36, ...rest }: AvatarProps) {
  const placeholder = getPlaceholder(name);
  return (
    <Wrapper size={size} {...rest}>
      <div>{placeholder}</div>
      {src ? <Image src={src} /> : null}
    </Wrapper>
  );
}
