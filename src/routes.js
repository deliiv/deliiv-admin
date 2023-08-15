import React from "react";
import LocalStorage from "../src/utils/localstorage";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Orders = React.lazy(() => import("./components/Orders/Tabs"));
const Order = React.lazy(() => import("./components/Orders/Order"));
const Customers = React.lazy(() => import("./components/Customers/Customers"));
const Agencies = React.lazy(() => import("./components/Agencies/Agencies"));
const Riders = React.lazy(() => import("./components/Riders/Riders"));
const Riders2 = React.lazy(() => import("./components/Riders/Riders2"));
const RidersDetails = React.lazy(() => import("./components/Riders/RiderDetails"));
const Verification = React.lazy(() => import("./components/Verification/Verification"));
const Notification = React.lazy(() => import("./components/Notification/Notification"));
const Payment = React.lazy(() => import("./components/Payment/Payment"));
const CustomerDetails = React.lazy(() => import("./components/Customers/CustomerTabs"));
const AgencyDetails = React.lazy(() => import("./components/Agencies/AgencyTabs"));


const userData = LocalStorage.get("user_data");
const Settings = React.lazy(() =>
  import("./components/Settings/Settings")
);


const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/orders", name: "Orders", component: Orders, exact: true },
  { path: "/orders/order/:id", name: "order", component: Order },
  { path: "/customers", name: "Customers", component: Customers, exact: true },
  { path: "/agencies", name: "Agencies", component: Agencies, exact: true },
  { path: "/riders", name: "Riders", component: Riders, exact: true },
  { path: "/riders-solo", name: "Riders", component: Riders2, exact: true },
  { path: "/riders/details/:id", name: "Riders", component: RidersDetails, exact: true },
  { path: "/riders-solo/details/:id", name: "Riders", component: RidersDetails, exact: true },
  { path: "/verification", name: "Riders", component:  Verification, exact: true },
  { path: "/notifications", name: "Notification", component: Notification, exact: true },
  { path: "/payment", name: "Payments", component: Payment, exact: true },
  { path: "/settings", name: "Settings", component: Settings },

  {
    path: "/customers/details/:id",
    name: "details",
    component: CustomerDetails,
  },
  {
    path: "/agencies/details/:id",
    name: "details",
    component: AgencyDetails,
  },
  {
    path: "/agencies/details/:id",
    name: "details",
    component: CustomerDetails,
  },
  {
    path: "/service-charge",
    component: Settings,
  },

];

export default routes;
