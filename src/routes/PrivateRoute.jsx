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
}) => {
  const checkPermission = () => {
    let hasPermission = true;

    switch (rest.location.pathname) {
      case ROUTES.ROLES:
        hasPermission = !!permissions.includes('list-roles');
        break;

      default:
        break;
    }
    return hasPermission;
  };

  return (
    <Route
      {...rest}
      render={(properties) => (isLogged && accessToken ? (
        checkPermission() === true ? (
          <Component {...properties} />
        ) : (
          <Redirect to={ROUTES.HOME} />
        )
      ) : (
        <Redirect to={ROUTES.SIGNIN} />
      ))}
    />
  );
};

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
