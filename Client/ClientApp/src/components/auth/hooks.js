import { useContext, useEffect } from 'react';
import { unstable_createResource } from 'react-cache';
import { AuthContext } from './AuthContext';
import { validateMe } from '../../api';

const getMe = unstable_createResource(validateMe);

export const useLoggedIn = () => {
  const { token, setUser } = useContext(AuthContext);
  const user = getMe.read(token);
  useEffect(
    () => {
      setUser(user);
    },
    [user]
  );
  return token && user;
};
