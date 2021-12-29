import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: null,
  totalCustomers: 0,
  //Counter
  totalOrders:0,
  totalProducts:0,
  totalUsers:0,
  totalActiveSellers:0,
  totalInActiveSellers:0,
  availableRegions:null,
  categories:null,
};

const dashboardSlice = createSlice({
  name: "Dashboard",
  initialState: initialState,
  reducers: {
    setDashboardData: (state, action) => {
      // state.customers = action.payload.usersData;
      // state.totalCustomers = action.payload.usersData.length;
      state.totalOrders = action.payload.dashboardData.all_orders
      state.totalProducts = action.payload.dashboardData.all_products
      state.totalUsers = action.payload.dashboardData.all_users
      state.totalActiveSellers = action.payload.dashboardData.all_active_sellers
      state.availableRegions = action.payload.dashboardData.available_regions
      state.categories = action.payload.dashboardData.available_categories
    },
  },
});

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice;
