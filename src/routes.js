import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Orders = React.lazy(() => import("./components/Orders/Orders"));
const Order = React.lazy(() => import("./components/Orders/Order"));
const Customers = React.lazy(() => import("./components/Customers/Customers"));
const Customer = React.lazy(() => import("./components/Customers/Customer"));
const Servicemen = React.lazy(() =>
  import("./components/Servicemen/Servicemen")
);
const AddServiceman = React.lazy(() => import("./components/Servicemen/add"));
const Serviceman = React.lazy(() =>
  import("./components/Servicemen/Serviceman")
);
const Services = React.lazy(() => import("./components/services/services"));
const AddService = React.lazy(() => import("./components/services/addService"));
const UpdateService = React.lazy(() =>
  import("./components/services/updateService")
);
const SubParts = React.lazy(() =>
  import("./components/services/subPartCategory")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/orders", name: "Orders", component: Orders, exact: true },
  { path: "/orders/order-:id", name: "order", component: Order },
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
    path: "/servicemen/add",
    name: "Add Serviceman",
    component: AddServiceman,
  },
  {
    path: "/services",
    name: "Services",
    component: Services,
    exact: true,
  },
  {
    path: "/services/add-service",
    name: "Add Service",
    component: AddService,
  },
  {
    path: "/services/update-:id",
    name: "Update Service",
    component: UpdateService,
  },
  {
    path: "/services/subpart-:id",
    name: "Sub-Part Categories",
    component: SubParts,
  },
];

export default routes;
