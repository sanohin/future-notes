import React, { useState } from 'react';
import { Switch } from 'react-router';
import { NavMenu } from './components/NavMenu';
import { Home } from './components/Home';
import { Login, SignUp } from './components/login';
import { AuthContext, PrivateRoute, NotLoggedInRoute } from './components/auth';
import { getSavedToken, saveToken } from './components/auth/utils';
import { updateAxiosToken } from './api';

export const App = () => {
  const [token, updateToken] = useState(getSavedToken());
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: next => {
          updateToken(next);
          saveToken(next);
          updateAxiosToken(next);
        }
      }}
    >
      <NavMenu />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <NotLoggedInRoute path="/login" component={Login} />
        <NotLoggedInRoute path="/sign-up" component={SignUp} />
      </Switch>
    </AuthContext.Provider>
  );
};
