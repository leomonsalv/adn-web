import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../constans/routes';
import useAuthContext from '../contexts/AuthContext/useAuthContext';
import Login from '../pages/Login/Login';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import DashBoardRoutes from './DashBoardRoutes';
import Register from '../pages/Register/Register';

const Routes = () => {
  const { isLogged, accessToken, permissions } = useAuthContext();

  return (
    <Router>
      <Switch>
        <PublicRoute
          exact
          path={ROUTES.REGISTER}
          component={Register}
          isLogged={isLogged}
          accessToken={accessToken}
        />
        <PublicRoute
          exact
          path={ROUTES.SIGNIN}
          component={Login}
          isLogged={isLogged}
          accessToken={accessToken}
        />

        <PrivateRoute
          path="/"
          component={DashBoardRoutes}
          isLogged={isLogged}
          accessToken={accessToken}
          permissions={permissions}
        />

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
