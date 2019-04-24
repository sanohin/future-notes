// @flow
import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { Spinner } from "evergreen-ui";
import { useStore } from "effector-react";
import { combine } from "effector";
import { $currentUser, $userLoading } from "./state";

const $userWithLoading = combine(
  $currentUser,
  $userLoading,
  (user, loading) => ({
    user,
    loading
  })
);

const PrivateHandler = ({ disableSpinner, component, ...rest }) => {
  const { loading, user } = useStore($userWithLoading);
  if (loading) {
    return disableSpinner ? null : <Spinner />;
  }
  return user ? React.createElement(component, rest) : <Redirect to="/login" />;
};

export const PrivateRoute = ({
  component,
  disableSpinner,
  ...routeProps
}: {
  disableSpinner?: boolean,
  component: React.ComponentType<any>
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
  const { user, loading } = useStore($userWithLoading);
  if (loading) {
    return <Spinner />;
  } else if (!user) {
    return React.createElement(component, rest);
  }
  return <Redirect to="/" />;
};

export const NotLoggedInRoute = ({
  component,
  ...routeProps
}: {
  component: React.ComponentType<any>
}) => {
  return (
    <Route
      {...routeProps}
      render={props => <PublicHandler {...props} component={component} />}
    />
  );
};
