import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import orderSlice from "./order-slice";

const store = configureStore({
  reducer: {
    UI: uiSlice.reducer,
    orders: orderSlice.reducer,
  },
});

export default store;
