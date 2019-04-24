// @flow
import * as React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { updateUser, setUserLoading } from "./state";

export function HandleAuth({ children }: { children: React.Node }) {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(next => {
      updateUser(next || null);
      setUserLoading(false);
    });
  }, []);

  return children;
}
