import React, { useContext, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { unstable_createResource } from 'react-cache';
import { AuthContext } from './AuthContext';
import { API } from '../../api';

const isLoggedIn = unstable_createResource(API.validateMe);

const Handler = ({ component, ...rest }) => {
  const { token } = useContext(AuthContext);
  const success = token ? isLoggedIn.read(token) : false;
  return success ? (
    React.createElement(component, rest)
  ) : (
    <Redirect to="/login" />
  );
};

export const PrivateRoute = ({ component, render, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={props => {
        return (
          <Suspense fallback={'Loading...'}>
            <Handler {...props} component={component} />
          </Suspense>
        );
      }}
    />
  );
};
