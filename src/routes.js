import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Orders = React.lazy(() => import("./components/Orders/Orders"));
const Order = React.lazy(() => import("./components/Orders/Order"));
const Customers = React.lazy(() => import("./components/Customers/Customers"));
const Customer = React.lazy(() => import("./components/Customers/Customer"));
const Stores = React.lazy(() => import("./components/Stores/Store"));
const CustomerDetails = React.lazy(() => import("./components/Customers/Tabs"));
const Seller = React.lazy(() =>import("./components/Seller/Servicemen"))
const SellerDetails = React.lazy(() =>import("./components/Seller/Tabs"));
const AddServiceman = React.lazy(() => import("./components/Seller/add"));
const AddProduct = React.lazy(() => import("./components/Seller/addProduct"));
const ViewProduct = React.lazy(() => import("./components/Seller/viewProduct"));
const Serviceman = React.lazy(() =>
  import("./components/Seller/Serviceman")
);
const Category = React.lazy(() => import("./components/category/services"));
const AddCategory = React.lazy(() => import("./components/category/addCategory"));
const UpdateCategory = React.lazy(() =>
  import("./components/category/updateCategory")
);
const SubParts = React.lazy(() => import("./components/Parts/subPartCategory"));
const PartsCategory = React.lazy(() =>
  import("./components/Parts/partsCategory")
);
const ServiceCharge = React.lazy(() =>
  import("./components/ServiceCharge/ServiceCharge")
);
const Region = React.lazy(() =>
  import("./components/region/Region")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/orders", name: "Orders", component: Orders, exact: true },
  { path: "/orders/order-:id", name: "order", component: Order },
  { path: "/customers", name: "Customers", component: Customers, exact: true },
  { path: "/store", name: "Ctore", component: Stores, exact: true },
  { path: "/customers/customer-:id", name: "Customer", component: Customer },
  {
    path: "/seller",
    name: "Seller",
    component: Seller,
    exact: true,
  },
  {
    path: "/seller/details/:id",
    name: "details",
    component: SellerDetails,
  },
  {
    path: "/customers/details/:id",
    name: "details",
    component: CustomerDetails,
  },
  {
    path: "/seller/add",
    name: "Add Seller",
    component: AddServiceman,
  },
  {
    path: "/seller/products/add",
    name: "Add Product",
    component: AddProduct,
  },
  {
    path: "/seller/products/:id",
    name: "View Product",
    component: ViewProduct,
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
    exact: true,
  },
  {
    path: "/category/add-category",
    name: "Add Category",
    component: AddCategory,
  },
  {
    path: "/category/update/:id",
    name: "Update Category",
    component: UpdateCategory,
  },
  {
    path: "/services/subpart-:id",
    name: "Sub-Part Categories",
    component: SubParts,
  },
  {
    path: "/parts-category",
    component: PartsCategory,
  },
  {
    path: "/service-charge",
    component: ServiceCharge,
  },
  {
    path: "/regions",
    component: Region,
  },
];

export default routes;
