import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banners: null
};

const bannerSlice = createSlice({
  name: "banners",
  initialState: initialState,
  reducers: {
    setBanner: (state, action) => {
      state.banners = action.payload.bannerData.data;
    },
  },
});

export const bannerAction = bannerSlice.actions;

export default bannerSlice;
