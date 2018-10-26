import React, { useContext, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { unstable_createResource } from 'react-cache';
import { AuthContext } from './AuthContext';
import { validateMe } from '../../api';

const isLoggedIn = unstable_createResource(validateMe);

const Handler = ({ component, ...rest }) => {
  const { token } = useContext(AuthContext);
  const logged = token ? isLoggedIn.read(token) : false;
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
          <Handler {...props} component={component} />
        </Suspense>
      )}
    />
  );
};
