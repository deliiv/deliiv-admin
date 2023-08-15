import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  region: null
};

const regionSlice = createSlice({
  name: "regionSlice",
  initialState: initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload.region.regions;
    },
  },
});

export const regionActions = regionSlice.actions;

export default regionSlice;
