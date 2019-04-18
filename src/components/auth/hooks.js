import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useLoggedIn = () => {
  const { user, loading } = useContext(AuthContext);
  return [!!user, loading];
};
