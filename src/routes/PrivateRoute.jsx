import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../constans/routes';

const PrivateRoute = ({
  component: Component,
  isLogged,
  accessToken,
  permissions,
  ...rest
}) => (
  <Route
    {...rest}
    render={(properties) => {
      const hasAccess = isLogged && accessToken;
      return hasAccess ? (
        <Component {...properties} />
      ) : (
        <Redirect to={ROUTES.SIGNIN} />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string)
};

PrivateRoute.defaultProps = {
  permissions: []
};

export default PrivateRoute;
