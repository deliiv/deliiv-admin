import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sellers: null,
  seller_details: null,
  // totalServicemen: 0,
};

const sellersSlice = createSlice({
  name: "sellers",
  initialState: initialState,
  reducers: {
    setSeller: (state, action) => {
      state.sellers = action.payload.sellerData.data;
    },
    
    loadSellerOrdersAndProducts: (state, action) => {
      state.seller_details = action.payload;
    },
  },
});

export const sellersAction = sellersSlice.actions;

export default sellersSlice;
