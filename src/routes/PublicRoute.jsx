import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../constans/routes';

const PublicRoute = ({
  component: Component,
  isLogged,
  accessToken,
  ...rest
}) => (
  <Route
    {...rest}
    render={(properties) => (!isLogged || !accessToken ? (
      <Component {...properties} />
    ) : (
      <Redirect to={ROUTES.HOME} />
    ))}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired
};

export default PublicRoute;
