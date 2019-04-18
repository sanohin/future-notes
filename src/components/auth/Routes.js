import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useLoggedIn } from "./hooks";
import { Spinner } from "evergreen-ui";

const PrivateHandler = ({ disableSpinner, component, ...rest }) => {
  const [logged, loading] = useLoggedIn();
  if (loading) {
    return disableSpinner ? null : <Spinner />;
  }
  return logged ? (
    React.createElement(component, rest)
  ) : (
    <Redirect to="/login" />
  );
};

export const PrivateRoute = ({
  component,
  disableSpinner,
  render,
  ...routeProps
}) => {
  return (
    <Route
      {...routeProps}
      render={props => (
        <PrivateHandler
          disableSpinner={disableSpinner}
          {...props}
          component={component}
        />
      )}
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
