import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  servicemen: null,
  totalServicemen: 0,
};

const servicemanSlice = createSlice({
  name: "serviceman",
  initialState: initialState,
  reducers: {
    setServiceman: (state, action) => {
      state.servicemen = action.payload.servicemenData;
      state.totalServicemen = action.payload.servicemenData.length;
    },
  },
});

export const servicemanAction = servicemanSlice.actions;

export default servicemanSlice;
