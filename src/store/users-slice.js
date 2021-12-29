import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  // totalServicemen: 0,
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload.userData;
    },
  },
});

export const usersAction = usersSlice.actions;

export default usersSlice;
