import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  totalOrders: 0,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.ordersData;
      state.totalOrders = action.payload.ordersData.length;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
