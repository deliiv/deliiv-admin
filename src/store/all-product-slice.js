import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_products: null,
  totalProducts:0
};

const allProductSlice = createSlice({
  name: "allProductsSlice",
  initialState: initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.all_products = action.payload.products.products
      state.totalProducts = action.payload.products.product_count
    },

  },
});

export const allProductActions = allProductSlice.actions;

export default allProductSlice;
