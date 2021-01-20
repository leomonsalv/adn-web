/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { showNotification } from 'stores/actions/notification';
import { cleanProfile, setProfile } from 'stores/actions/profile';
import jwtDecode from 'jwt-decode';
import API from 'services';
import { loginAttempt, loginSuccess } from 'stores/actions/auth';
import Routes from './routes/Routes';
import AuthProvider from './contexts/AuthContext/AuthContext';

import { getToken, cleanSessionStorage } from './firebase/utils/token';

import odooModels from './odoo/models';
import clientQueries from './odoo/queries/client';

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
      dispatch(loginAttempt());
      const userId = JSON.parse(sessionStorage.getItem('userId'));

      const body = {
        model: odooModels.RES_PARTNER,
        params: {
          query: clientQueries.GET_PROFILE_CLIENT
        }
      };

      const { data } = await API.odoo.getOdooById(userId, body);

      const { response: userProfile } = data;

      if (userProfile) {
        const isClientUser = userProfile.category_id.find(
          (category) => category.name.toLowerCase() === 'client'
        );

        if (!isClientUser) {
          dispatch(cleanProfile());
          cleanSessionStorage();
          dispatch(
            showNotification({
              type: 'error',
              message: 'Error',
              content: 'Need a Category Client User to Access'
            })
          );
          return;
        }

        const permissions = userProfile.x_role_id.x_permission_ids.map(
          (permission) => permission.x_name
        );

        const role = {
          role: userProfile.x_role_id.x_name,
          permissions
        };

        if (role === undefined) {
          dispatch(cleanProfile());
          cleanSessionStorage();
          return;
        }

        dispatch(
          setProfile({
            ...userProfile,
            isLogged: true,
            accessToken,
            role
          })
        );
        dispatch(loginSuccess(userProfile));
      }
    };
    if (isLogged) {
      initProfile();
    }
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
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
        cleanSessionStorage();
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
      verifyToken();
    }
  }, [location]);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
