import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { docsToArray } from "./utils";

const auth = firebase.auth();

export const signUp = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const logIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const googleLogIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

export const logOut = () => {
  return auth.signOut();
};

export const getNotes = () => {
  return firebase
    .firestore()
    .collection("notex")
    .where("userId", "==", auth.currentUser.uid)
    .orderBy("timestamp", "desc")
    .limit(10)
    .get()
    .then(docsToArray);
};

export const removeNote = id => {
  return firebase
    .firestore()
    .collection("notex")
    .doc(id)
    .delete();
};

export const updateNote = ({ id, content }) => {
  return firebase
    .firestore()
    .collection("notex")
    .doc(id)
    .update({
      content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
};

export const createNote = content => {
  return firebase
    .firestore()
    .collection("notex")
    .add({
      content,
      userId: auth.currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(res => {
      return { content, userId: auth.currentUser.uid, id: res.id };
    })
    .catch(e => {
      console.log(e);
    });
};
