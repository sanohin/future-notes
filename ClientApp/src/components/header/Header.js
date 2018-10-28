import React, { useContext } from 'react';
import { Avatar, Pane, Popover, Button } from 'evergreen-ui';
import { AuthContext } from '../auth';

export const Header = () => {
  const { user = {}, setToken } = useContext(AuthContext);
  const name = user ? `${user.firstName} ${user.lastName}` : '';
  const logout = () => setToken('');
  return (
    <Pane display="flex" justifyContent="flex-end">
      <Popover
        content={
          <Pane display="flex" alignItems="center" height={50}>
            <Button intent="danger" iconAfter="log-out" onClick={logout}>
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
