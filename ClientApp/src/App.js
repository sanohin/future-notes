import React, { useState, Suspense } from 'react';
import { Switch } from 'react-router';
import { Login, SignUp } from './components/login';
import { NotesList } from './components/notes';
import { Header } from './components/header';
import { AuthContext, PrivateRoute, NotLoggedInRoute } from './components/auth';
import { getSavedToken, saveToken } from './components/auth/utils';
import { updateAxiosToken } from './api';

export const App = () => {
  const [token, updateToken] = useState(getSavedToken());
  const [user, updateUser] = useState(null);
  return (
    <Suspense fallback={'Loading...'}>
      <AuthContext.Provider
        value={{
          token,
          user,
          setUser: updateUser,
          setToken: next => {
            saveToken(next);
            updateAxiosToken(next);
            updateToken(next);
          }
        }}
      >
        <PrivateRoute exact path="/" component={Header} />
        <Switch>
          <PrivateRoute exact path="/" component={NotesList} />
          <NotLoggedInRoute path="/login" component={Login} />
          <NotLoggedInRoute path="/sign-up" component={SignUp} />
        </Switch>
      </AuthContext.Provider>
    </Suspense>
  );
};
