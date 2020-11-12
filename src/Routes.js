import react from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signin from './users/Signin';
import Signup from './users/Signup';
import Home from './core/Home';
import Shop from './core/Shop';
import Menu from './core/Menu';
import UserDashboard from '../src/users/UserDashboard';
import AdminDashboard from '../src/users/AdminDashboard';
import PrivateRoute from '../src/auth/PrivateRoute';
import AdminRoute from '../src/auth/AdminRoute';
import AddCategory from './admin/AddCatedgory';
import AddProduct from './admin/AddProduct';

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/shop" exact component={Shop} />

        <Route path="/signin" exact component={Signin} />

        <Route path="/signup" exact component={Signup} />

        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />

        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />

        <AdminRoute path="/create/category" exact component={AddCategory} />

        <AdminRoute path="/create/product" exact component={AddProduct} />

      </Switch>

    </BrowserRouter>
  );
};

export default Routes;
