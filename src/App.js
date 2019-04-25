// @flow
import React from "react";
import { Switch } from "react-router";
import { Header } from "./components/header";
import { PrivateRoute, NotLoggedInRoute, HandleAuth } from "./components/auth";

const NotesFeature = React.lazy(() => import("./components/notes"));
const LoginFeature = React.lazy(() => import("./components/login"));

export const App = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HandleAuth>
        <PrivateRoute disableSpinner exact path="/" component={Header} />
        <Switch>
          <PrivateRoute exact path="/" component={NotesFeature} />
          <NotLoggedInRoute path="/(login|sign-up)" component={LoginFeature} />
        </Switch>
      </HandleAuth>
    </React.Suspense>
  );
};
