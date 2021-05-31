import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: null,
  totalCustomers: 0,
};

const customerSlice = createSlice({
  name: "Customers",
  initialState: initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload.usersData;
      state.totalCustomers = action.payload.usersData.length;
    },
  },
});

export const customerActions = customerSlice.actions;

export default customerSlice;
