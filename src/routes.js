import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Orders = React.lazy(() => import("./components/Orders/Orders"));
const Order = React.lazy(() => import("./components/Orders/Order"));
const Customers = React.lazy(() => import("./components/Customers/Customers"));
const Customer = React.lazy(() => import("./components/Customers/Customer"));
const Servicemen = React.lazy(() =>
  import("./components/Servicemen/Servicemen")
);
const Serviceman = React.lazy(() =>
  import("./components/Servicemen/Serviceman")
);
const Services = React.lazy(() => import("./components/services/services"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/jobs", name: "Jobs", component: Orders, exact: true },
  { path: "/jobs/job-:id", name: "job", component: Order },
  { path: "/customers", name: "Customers", component: Customers, exact: true },
  { path: "/customers/customer-:id", name: "Customer", component: Customer },
  {
    path: "/servicemen",
    name: "Servicemen",
    component: Servicemen,
    exact: true,
  },
  {
    path: "/servicemen/serviceman",
    name: "Serviceman",
    component: Serviceman,
  },
  {
    path: "/services",
    name: "Services",
    component: Services,
  },
];

export default routes;
