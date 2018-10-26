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

export const validateMe = token =>
  axiosInstance
    .get('/api/users/me')
    .then(res => true)
    .catch(err => {
      if (err.response.status === 401) {
        return false;
      }
      return null;
    });
