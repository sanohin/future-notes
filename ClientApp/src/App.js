import React from 'react';
import { Route, Switch } from 'react-router';
import { NavMenu } from './components/NavMenu';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login, SignUp } from './components/login';
import { AuthContext, PrivateRoute } from './components/auth';

const getAuth = () => ({
  token: localStorage.getItem('jwt-token')
});

export const App = () => (
  <AuthContext.Provider value={getAuth()}>
    <NavMenu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute path="/counter" component={Counter} />
      <Route path="/fetchdata" component={FetchData} />
    </Switch>
  </AuthContext.Provider>
);
