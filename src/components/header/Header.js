// @flow
import React from "react";
import { useStore } from "effector-react";
import Popover from "react-tiny-popover";
import { $currentUser } from "../auth";
import { HeaderContainer, popoverContainer } from "./styled";
import { logOut } from "../../api";
import { Avatar, MenuItem } from "../ui";

export function Header({ avatarSize = 40 }: { avatarSize?: number }) {
  const [isOpen, setOpen] = React.useState(false);
  const user = useStore($currentUser);
  const close = React.useCallback(() => setOpen(false), []);
  const open = React.useCallback(() => setOpen(true), []);
  if (!user) {
    return null;
  }

  const name = user.displayName || user.email;
  const img = user.photoURL
    ? user.photoURL + "?sz=" + avatarSize * 1.5
    : undefined;

  return (
    <HeaderContainer>
      <Popover
        isOpen={isOpen}
        position="bottom"
        onClickOutside={close}
        containerClassName={popoverContainer}
        content={
          <div>
            <MenuItem intent="danger" onClick={logOut}>
              Log out ({user.email})
            </MenuItem>
          </div>
        }
      >
        <Avatar onClick={open} src={img} name={name} size={avatarSize} />
      </Popover>
    </HeaderContainer>
  );
}
