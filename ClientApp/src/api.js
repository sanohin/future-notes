import axios from 'axios';

export const API = {
  validateMe: token => {
    return new Promise(
      res =>
        setTimeout(() => {
          res(10);
        }),
      1000
    );
  },
  login: ({ email, password }) => {
    console.log(axios);
  },
  signUp: ({ email, password, name, surname }) => {
    return axios.post('');
  }
};
