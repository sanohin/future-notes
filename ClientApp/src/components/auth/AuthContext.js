import React from "react";
import firebase from "firebase";

export const AuthContext = React.createContext(null);

export const AuthHandle = ({ children }) => {
  const _user = firebase.auth().currentUser;
  const [userState, update] = React.useState({ user: _user, loading: true });
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(next => {
      update({
        user: next || null,
        loading: false
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={userState}>{children}</AuthContext.Provider>
  );
};
