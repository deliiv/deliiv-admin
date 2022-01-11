import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  totalPending: 0,
  totalCompleted: 0,
  totalPickedup: 0,
  totalCancelled: 0,
  totalOrder:0
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: initialState,
  reducers: {
    setOrders: (state, action) => {
      state.totalCancelled = action.payload.ordersData.total_cancelled_order
      state.totalPickedup = action.payload.ordersData.total_pickedup_order
      state.totalCompleted = action.payload.ordersData.total_delivered_order
      state.totalPending = action.payload.ordersData.total_pending_order
      state.orders = action.payload.ordersData.orders
      state.totalOrder = action.payload.ordersData.total_order
    
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
