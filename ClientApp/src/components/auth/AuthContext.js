import React from 'react';

export const AuthContext = React.createContext({
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {}
});
