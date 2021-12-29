import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
  sidebarShow: "responsive",
  asideShow: false,
  darkMode: true,
  backgroundColor: "#65589C",
};

const uiSlice = createSlice({
  name: "UI",
  initialState: initialUIState,
  reducers: {
    toggleSidebar: (state) => {
      const val = [true, "responsive"].includes(state.sidebarShow)
        ? false
        : "responsive";
      state.sidebarShow = val;
    },
    toggleSidebarMobile: (state) => {
      const val = [false, "responsive"].includes(state.sidebarShow)
        ? true
        : "responsive";
      state.sidebarShow = val;
    },
    toggleMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
