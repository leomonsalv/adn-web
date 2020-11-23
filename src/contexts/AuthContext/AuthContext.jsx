import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const AuthContext = createContext({
  isLogged: false,
  accessToken: '',
  permissions: []
});

const AuthProvider = ({ children }) => {
  const {
    isLogged,
    accessToken,
    role: { permissions }
  } = useSelector((state) => state.profile);

  return (
    <AuthContext.Provider value={{ isLogged, accessToken, permissions }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AuthProvider;
