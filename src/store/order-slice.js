import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  totalOrders: 0,
  completedOrders: 0,
  pendingOrders: 0,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.ordersData;
      state.totalOrders = action.payload.ordersData.length;
      state.completedOrders = action.payload.ordersData.filter((order) => {
        return order.status === "complete";
      }).length;
      state.pendingOrders = action.payload.ordersData.filter((order) => {
        return order.status === "pending";
      }).length;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
