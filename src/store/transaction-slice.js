import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payStack: null,
  witdrawalRequest: null,
  totalStoreItem: 0,
};

const transactionSlice = createSlice({
  name: "Transactions",
  initialState: initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.witdrawalRequest = action.payload.allWitdrawalRequest.data;
      // state.payStack = action.payload.transactions.paystack;
    },
  },
});

export const transactionActions = transactionSlice.actions;

export default transactionSlice;
