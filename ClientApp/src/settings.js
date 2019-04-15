import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCq6bEJSQ3iPSdS9TSrCoNELbAFWaV50eo",
  authDomain: "notes-33d72.firebaseapp.com",
  databaseURL: "https://notes-33d72.firebaseio.com",
  projectId: "notes-33d72",
  storageBucket: "notes-33d72.appspot.com",
  messagingSenderId: "137590186315"
};
firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "development") {
  window.firebase = firebase;
}
