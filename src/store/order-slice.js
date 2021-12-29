import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  totalOrders: 0,
  completedOrders: 0,
  pendingOrders: 0,
  newOrders: null,
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
    setNewOrders: (state, action) => {
      const start = new Date();
      start.setHours(0, 0, 0);

      state.newOrders = action.payload.ordersData.filter((order) => {
        return order.date_created > start;
      });
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
