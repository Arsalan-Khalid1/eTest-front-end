import react from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signin from './users/Signin';
import Signup from './users/Signup';
import Home from './core/Home';
import Menu from './core/Menu';

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Switch>
        <Route path="/signin" exact component={Signin} />
      </Switch>
      <Switch>
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
