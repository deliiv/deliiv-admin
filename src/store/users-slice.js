import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  user_detail: null
  // totalServicemen: 0,
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload.userData;
    },

    loadUserDetails: (state, action) => {
      state.user_detail = action.payload;
    },
  },
});

export const usersAction = usersSlice.actions;

export default usersSlice;
