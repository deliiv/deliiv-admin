import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import orderSlice from "./order-slice";
import customerSlice from "./customer-slice";
import servicemanSlice from "./serviceman-slice";

const store = configureStore({
  reducer: {
    UI: uiSlice.reducer,
    orders: orderSlice.reducer,
    customers: customerSlice.reducer,
    servicemen: servicemanSlice.reducer,
  },
});

export default store;
