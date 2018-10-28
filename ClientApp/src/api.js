import axios from 'axios';
import { getSavedToken } from './components/auth/utils';

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${getSavedToken()}`
  }
});

export const updateAxiosToken = next => {
  axiosInstance.defaults.headers.Authorization = `Bearer ${next}`;
};

export const signUp = ({ userName, password, firstName, lastName }) =>
  axiosInstance
    .post('api/users/register', { userName, password, firstName, lastName })
    .then(({ data }) => data)
    .catch(err => {
      console.log(err.response.message);
    });

export const logIn = ({ userName, password }) =>
  axiosInstance
    .post('api/users/authenticate', { userName, password })
    .then(({ data }) => data)
    .catch(err => {
      console.log(err.response.message);
    });

export const validateMe = () =>
  axiosInstance
    .get('/api/users/me')
    .then(() => true)
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
