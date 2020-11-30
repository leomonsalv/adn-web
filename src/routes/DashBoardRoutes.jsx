import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as ROUTES from '../constans/routes';
import DashBoard from '../pages/DashBoard/DashBoard';
import Products from '../pages/Products/Products';
import ProductsView from '../pages/Products/ProductsView';

const DashBoardRoutes = () => (
  <>
    <DashBoard>
      <Switch>
        <Route exact path={ROUTES.PRODUCTS} component={Products} />
        <Route
          exact
          path={`${ROUTES.PRODUCTS}/:productId/view`}
          component={ProductsView}
        />
      </Switch>
    </DashBoard>
  </>
);

export default DashBoardRoutes;
