import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import orderSlice from "./order-slice";
import customerSlice from "./customer-slice";
import serviceSlice from "./serviceSlice";
import dashboardSlice from './dashboard-slice';
import sellerSlice from './sellers-slice';
import userSlice from './users-slice';
import categorySlice from './category-slice';
import serviceChargeSlice from './service-charge-slice';
import regionSlice from './region-slice';
import storeSlice from './store-slice';
import bannerSlice from './banner-slice';
import adminSlice from './admin-slice';
import allProductSlice from './all-product-slice';
import transactionSlice from './transaction-slice';

const store = configureStore({
  reducer: {
    UI: uiSlice.reducer,
    orders: orderSlice.reducer,
    customers: customerSlice.reducer,
    services: serviceSlice.reducer,
    dashbord: dashboardSlice.reducer,
    seller: sellerSlice.reducer,
    users: userSlice.reducer,
    category: categorySlice.reducer,
    servicecharge: serviceChargeSlice.reducer,
    region: regionSlice.reducer,
    store: storeSlice.reducer,
    banner: bannerSlice.reducer,
    admin: adminSlice.reducer,
    allProducts:allProductSlice.reducer,
    transactions:transactionSlice.reducer
  },
});
export default store;
