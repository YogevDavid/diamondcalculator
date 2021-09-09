import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Diamond from '../Diamonds/Diamond';
import MyDiamonds from '../Diamonds/MyDiamonds';
import CalcLogic from '../CalcLogics/CalcLogic';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/diamond/:diamond_id" component={Diamond} />
        <PrivateRoute exact path="/mydiamonds" component={MyDiamonds} />
        <PrivateRoute exact path="/calclogic" component={CalcLogic} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
