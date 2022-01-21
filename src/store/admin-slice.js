import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: null,
  number_of_admin:0
};

const adminSlice = createSlice({
  name: "admins",
  initialState: initialState,
  reducers: {
    setAdmins: (state, action) => {
      state.admins = action.payload.adminData.admins;
      state.number_of_admin = action.payload.adminData.number_of_admin;
    },
  },
});

export const adminAction = adminSlice.actions;
export default adminSlice;
