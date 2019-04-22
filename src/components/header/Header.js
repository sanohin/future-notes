import React, { useContext } from "react";
import { Avatar, Pane, Popover, Menu } from "evergreen-ui";
import { AuthContext } from "../auth";
import { logOut } from "../../api";

export const Header = ({ avatarSize = 40 }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return null;
  }
  const name = user.displayName || user.email;
  const img = user.photoURL
    ? user.photoURL + "?sz=" + avatarSize * 1.5
    : undefined;
  return (
    <Pane display="flex" justifyContent="flex-end" margin="8px">
      <Popover
        content={
          <Pane>
            <Menu>
              <Menu.Group>
                <Menu.Item>Share...</Menu.Item>
                <Menu.Item>Move...</Menu.Item>
                <Menu.Item>Rename...</Menu.Item>
              </Menu.Group>
              <Menu.Divider />
              <Menu.Group>
                <Menu.Item intent="danger" onSelect={logOut}>
                  Log out ({user.email})
                </Menu.Item>
              </Menu.Group>
            </Menu>
          </Pane>
        }
      >
        <Avatar src={img} name={name} isSolid size={avatarSize} />
      </Popover>
    </Pane>
  );
};
