import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
  // totalServicemen: 0,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload.categoryData;
    },
  },
});

export const categoryAction = categorySlice.actions;

export default categorySlice;
