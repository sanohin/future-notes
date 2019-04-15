import React from "react";
import { Switch } from "react-router";
import { Login, SignUp } from "./components/login";
import { NotesList } from "./components/notes";
import { Header } from "./components/header";
import { PrivateRoute, AuthHandle, NotLoggedInRoute } from "./components/auth";
import "./app.css";

export const App = () => {
  return (
    <AuthHandle>
      <PrivateRoute disableSpinner exact path="/" component={Header} />
      <Switch>
        <PrivateRoute exact path="/" component={NotesList} />
        <NotLoggedInRoute path="/login" component={Login} />
        <NotLoggedInRoute path="/sign-up" component={SignUp} />
      </Switch>
    </AuthHandle>
  );
};
