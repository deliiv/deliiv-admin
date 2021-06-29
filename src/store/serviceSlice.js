import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: null,
  totalServices: 0,
};

const serviceSlice = createSlice({
  name: "serviceman",
  initialState: initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload.serviceData;
      state.totalServices = action.payload.serviceData.length;
    },
  },
});

export const serviceActions = serviceSlice.actions;

export default serviceSlice;
