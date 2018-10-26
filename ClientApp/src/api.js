import axios from 'axios';

export const signUp = ({ userName, password, firstName, lastName }) => {
  return axios
    .post('api/users/register', { userName, password, firstName, lastName })
    .then(res => {});
};

export const validateMe = token => {
  return new Promise(
    res =>
      setTimeout(() => {
        res(true);
      }),
    1000
  );
};
