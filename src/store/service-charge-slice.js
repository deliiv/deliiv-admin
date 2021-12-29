import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service_charge: null,
  // totalOrders: 0,
  // completedOrders: 0,
  // pendingOrders: 0,
  // newOrders: null,
};

const serviceChargeSlice = createSlice({
  name: "serviceChargeSlice",
  initialState: initialState,
  reducers: {
    setServiceCharge: (state, action) => {
      state.serviceCharge = action.payload.serviceCharge.service_charge;
      // state.totalOrders = action.payload.ordersData.length;
      // state.completedOrders = action.payload.ordersData.filter((order) => {
      //   return order.status === "complete";
      // }).length;
      // state.pendingOrders = action.payload.ordersData.filter((order) => {
      //   return order.status === "pending";
      // }).length;
    },
    // setNewOrders: (state, action) => {
    //   const start = new Date();
    //   start.setHours(0, 0, 0);

    //   state.newOrders = action.payload.ordersData.filter((order) => {
    //     return order.date_created > start;
    //   });
    // },
  },
});

export const serviceChargeActions = serviceChargeSlice.actions;

export default serviceChargeSlice;
