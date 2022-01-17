import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  allStoreProducts: null,
  totalStoreItem: 0,
};

const storeSlice = createSlice({
  name: "Stores",
  initialState: initialState,
  reducers: {
    setStore: (state, action) => {
      console.log('?????: ', action.payload.allProducts)

      state.allStoreProducts = action.payload.allProducts.store_product;
      state.totalStoreItem = action.payload.allProducts.store_product_count;
    },
  },
});

export const storeActions = storeSlice.actions;

export default storeSlice;
