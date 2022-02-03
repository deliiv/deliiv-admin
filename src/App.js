import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import ExpirySession from "./utils/expirysession";
import "./scss/style.scss";

import { useDispatch } from "react-redux";
import { fetchOrders } from "./store/order-actions";
import { fetchCustomers } from "./store/customer-actions";
import { fetchServices, fetchParts } from "./store/service-actions";
import { fetchServiceCharge } from './store/service-charge-actions'
import { fetchRegion } from './store/region-actions'
import { fetchStore } from './store/store-actions'
import { fetchAllBanners } from './store/banner-actions'
import { fetchAllAdmins } from './store/admin-actions'
import { fetchAllProducts } from './store/all-product-actions'

import {loadBoard, fetchAvailableRegions, fetchAvailableCategory} from './store/dashboard-actions'
import { fetchAllCategories} from './store/category-actions'
import {fetchAllSellers, fetchSellerDetails} from './store/sellers-actions'
import {fetchAllUsers} from './store/users-actions'
import {fetchTransactions} from './store/transaction-actions'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Email App
const TheEmailApp = React.lazy(() => import("./views/apps/email/TheEmailApp"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadBoard());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchAvailableRegions());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchAllSellers());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchServiceCharge());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchRegion());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchStore());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchAllBanners());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchAllAdmins());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <PublicRoute
            path="/apps/email"
            name="Email App"
            component={TheEmailApp}
          />
          {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}
          <PrivateRouter path="/" name="Home" component={TheLayout} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      ExpirySession.get("access") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      ExpirySession.get("access") ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default App;
