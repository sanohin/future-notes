// @flow
import React from "react";
import { Switch } from "react-router";
import { Login, SignUp } from "./components/login";
import { Header } from "./components/header";
import { PrivateRoute, NotLoggedInRoute, HandleAuth } from "./components/auth";

const NotesFeature = React.lazy(() => import("./components/notes"));

export const App = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HandleAuth>
        <PrivateRoute disableSpinner exact path="/" component={Header} />
        <Switch>
          <PrivateRoute exact path="/" component={NotesFeature} />
          <NotLoggedInRoute path="/login" component={Login} />
          <NotLoggedInRoute path="/sign-up" component={SignUp} />
        </Switch>
      </HandleAuth>
    </React.Suspense>
  );
};
