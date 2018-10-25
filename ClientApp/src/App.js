import React from 'react';
import { Route, Switch } from 'react-router';
import { NavMenu } from './components/NavMenu';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

export const App = () => (
  <React.Fragment>
    <NavMenu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/counter" component={Counter} />
      <Route path="/fetchdata" component={FetchData} />
    </Switch>
  </React.Fragment>
);
