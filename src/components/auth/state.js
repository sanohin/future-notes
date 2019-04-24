// @flow
import { createStore, createEvent } from "effector";
import * as firebase from "firebase/app";
import "firebase/auth";

export const $currentUser = createStore<firebase.User | null>(
  firebase.auth().currentUser
);
export const $userLoading = createStore<boolean>(true);

export const updateUser = createEvent<firebase.User | null>();
export const setUserLoading = createEvent<boolean>();

$userLoading.on(setUserLoading, (_, n) => n);
$currentUser.on(updateUser, (_, n) => n);
