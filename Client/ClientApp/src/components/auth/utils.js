const STORE_KEY = 'jwt-token';

export const getSavedToken = () => localStorage.getItem(STORE_KEY);
export const saveToken = next => localStorage.setItem(STORE_KEY, next);
