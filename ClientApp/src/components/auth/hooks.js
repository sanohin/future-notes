import { useContext } from 'react';
import { unstable_createResource } from 'react-cache';
import { AuthContext } from './AuthContext';
import { validateMe } from '../../api';

const isLoggedIn = unstable_createResource(validateMe);

export const useLoggedIn = () => {
  const { token } = useContext(AuthContext);
  return token && isLoggedIn.read(token);
};
