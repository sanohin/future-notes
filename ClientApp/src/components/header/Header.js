import React, { useContext } from "react";
import { Avatar, Pane, Popover, Button } from "evergreen-ui";
import { AuthContext } from "../auth";
import { logOut } from "../../api";

export const Header = () => {
  const { user } = useContext(AuthContext);
  const name = user ? `${user.email}` : "";

  return (
    <Pane display="flex" justifyContent="flex-end">
      <Popover
        content={
          <Pane display="flex" alignItems="center" height={50}>
            <Button intent="danger" iconAfter="log-out" onClick={logOut}>
              Logout
            </Button>
          </Pane>
        }
      >
        <Avatar name={name} isSolid size={40} />
      </Popover>
    </Pane>
  );
};
