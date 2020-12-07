import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { showNotification } from 'stores/actions/notification';
import { cleanProfile } from 'stores/actions/profile';
import jwtDecode from 'jwt-decode';
import Routes from './routes/Routes';
import AuthProvider from './contexts/AuthContext/AuthContext';

import { getToken, removeToken } from './firebase/utils/token';

const init = () => {
  const token = getToken();

  return token
    ? { isLogged: true, accessToken: token }
    : { isLogged: false, accessToken: '' };
};

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const { isLogged, accessToken } = init();

  useEffect(() => {
    const initProfile = async () => {
      let validToken = false;
      let isExpired = false;

      try {
        const token = await jwtDecode(accessToken);
        if (Date.now() >= token.exp * 1000) {
          validToken = false;
          isExpired = true;
        } else {
          validToken = true;
        }
      } catch {
        validToken = false;
      }

      const errorMessage = isExpired ? 'Token Expired' : 'Invalid Token';

      if (!accessToken || !validToken) {
        removeToken();
        dispatch(
          showNotification({
            type: 'error',
            message: 'Error Access Token',
            content: errorMessage
          })
        );
        dispatch(cleanProfile());
      }
    };
    if (isLogged) {
      initProfile();
    }
  }, [isLogged, accessToken, dispatch, location]);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
