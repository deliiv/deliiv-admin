import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localTransaction: null,
  payStack: null,
  totalStoreItem: 0,
};

const transactionSlice = createSlice({
  name: "Transactions",
  initialState: initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.payStack = action.payload.transactions.paystack;
      state.localTransaction = action.payload.transactions.local_transaction;
    },
  },
});

export const transactionActions = transactionSlice.actions;

export default transactionSlice;
