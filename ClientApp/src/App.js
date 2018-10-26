import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import { NavMenu } from './components/NavMenu';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login, SignUp } from './components/login';
import { AuthContext, PrivateRoute } from './components/auth';

const getInitialToken = () => localStorage.getItem('jwt-token');
const setInitialToken = next => localStorage.setItem('jwt-token', next);

export const App = () => {
  const [token, updateToken] = useState(getInitialToken());
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: next => {
          updateToken(next);
          setInitialToken(next);
        }
      }}
    >
      <NavMenu />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <PrivateRoute path="/counter" component={Counter} />
        <Route path="/fetchdata" component={FetchData} />
      </Switch>
    </AuthContext.Provider>
  );
};
