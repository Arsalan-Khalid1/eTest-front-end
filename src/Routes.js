import react from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signin from './users/Signin';
import Signup from './users/Signup';
import Home from './core/Home';
import Menu from './core/Menu';
import UserDashboard from '../src/users/UserDashboard';
import PrivateRoute from '../src/auth/PrivateRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/signin" exact component={Signin} />

        <Route path="/signup" exact component={Signup} />

        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
      </Switch>

    </BrowserRouter>
  );
};

export default Routes;
