import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: null,
  totalServices: 0,
  serviceNameToIdLink: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState: initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload.serviceData;
      state.totalServices = action.payload.serviceData.length;
    },
    setServiceObject: (state, action) => {
      const services = action.payload.service;
      const hth = {};
      for (let i = 0; i < services.length; i++) {
        hth[services[i].title] = services[i]._id;
      }
      state.serviceNameToIdLink = hth;
    },
  },
});

export const serviceActions = serviceSlice.actions;

export default serviceSlice;
