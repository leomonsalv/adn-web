import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const useAuthContext = () => {
  const { isLogged, accessToken, permissions } = useContext(AuthContext);

  return {
    isLogged,
    accessToken,
    permissions
  };
};

export default useAuthContext;
