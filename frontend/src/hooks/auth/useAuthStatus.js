// useAuthStatus.js
import { useAuth } from "./AuthContext";

const useAuthStatus = () => {
  const { state, login, logout,setUid } = useAuth();
  return { state, login, logout,setUid };
};

export default useAuthStatus;
