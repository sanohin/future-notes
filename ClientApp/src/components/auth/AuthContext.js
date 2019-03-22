/* globals firebase */
import React from "react";

export const AuthContext = React.createContext(null);

export const AuthHandle = ({ children }) => {
  const _user = firebase.auth().currentUser;
  const [userState, update] = React.useState({ user: _user, loading: true });
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(next => {
      console.log("userChange", next);
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
