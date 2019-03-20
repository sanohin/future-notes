import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLoggedIn } from './hooks';
import { Spinner } from 'evergreen-ui';

const PrivateHandler = ({ component, ...rest }) => {
  const [logged, loading] = useLoggedIn();
  if (loading) {
    return <Spinner />;
  }
  return logged ? (
    React.createElement(component, rest)
  ) : (
    <Redirect to="/login" />
  );
};

export const PrivateRoute = ({ component, render, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={props => <PrivateHandler {...props} component={component} />}
    />
  );
};

const PublicHandler = ({ component, ...rest }) => {
  const [logged, loading] = useLoggedIn();
  if (loading) {
    return <Spinner />;
  }
  return !logged ? React.createElement(component, rest) : <Redirect to="/" />;
};

export const NotLoggedInRoute = ({ component, render, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={props => <PublicHandler {...props} component={component} />}
    />
  );
};
