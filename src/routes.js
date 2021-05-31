import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Orders = React.lazy(() => import("./components/Orders/Orders"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/orders", name: "Orders", component: Orders, exact: true },
];

export default routes;
