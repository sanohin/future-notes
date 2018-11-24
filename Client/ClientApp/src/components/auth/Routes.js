import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLoggedIn } from './hooks';

const PrivateHandler = ({ component, ...rest }) => {
  const logged = useLoggedIn();
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
      render={props => (
        <Suspense fallback={'Loading...'}>
          <PrivateHandler {...props} component={component} />
        </Suspense>
      )}
    />
  );
};

const PublicHandler = ({ component, ...rest }) => {
  const logged = useLoggedIn();
  return !logged ? React.createElement(component, rest) : <Redirect to="/" />;
};

export const NotLoggedInRoute = ({ component, render, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={props => (
        <Suspense fallback={'Loading...'}>
          <PublicHandler {...props} component={component} />
        </Suspense>
      )}
    />
  );
};
