/* globals firebase */
import axios from 'axios';

export const axiosInstance = axios.create({});

export const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const logIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logOut = () => {
  return firebase.auth().signOut();
};

export const validateMe = () =>
  axiosInstance
    .get('/api/users/me')
    .then(({ data }) => data)
    .catch(err => {
      if (err.response.status === 401) {
        return false;
      }
      return null;
    });

export const getNotes = () => axiosInstance.get('/api/notes').then(r => r.data);

export const updateNote = ({ id, content }) =>
  axiosInstance.patch(`/api/notes/${id}`, { content });

export const createNote = content =>
  axiosInstance.post(`/api/notes`, { content }).then(res => res.data);
