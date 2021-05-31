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

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/orders", name: "Orders", component: Orders, exact: true },
  { path: "/orders/order", name: "Order", component: Order },
  { path: "/customers", name: "Customers", component: Customers, exact: true },
  { path: "/customers/customer", name: "Customer", component: Customer },
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
];

export default routes;
