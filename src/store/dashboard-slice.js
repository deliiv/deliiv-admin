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
  chart:null,
  pie:null
};

const dashboardSlice = createSlice({
  name: "Dashboard",
  initialState: initialState,
  reducers: {
    setDashboardData: (state, action) => {
      console.log('===========', action.payload.dashboardData)
      // state.customers = action.payload.usersData;
      // state.totalCustomers = action.payload.usersData.length;
      state.totalOrders = action.payload.dashboardData && action.payload.dashboardData.all_orders && action.payload.dashboardData.all_orders
      state.totalProducts =  action.payload.dashboardData && action.payload.dashboardData.all_products
      state.totalUsers =  action.payload.dashboardData && action.payload.dashboardData.all_users
      state.totalActiveSellers = action.payload.dashboardData && action.payload.dashboardData.all_active_sellers
      state.totalInActiveSellers =  action.payload.dashboardData && action.payload.dashboardData.all_inactive_sellers
      state.availableRegions =  action.payload.dashboardData && action.payload.dashboardData.available_regions
      state.categories =  action.payload.dashboardData && action.payload.dashboardData.available_categories
      state.pie = action.payload.dashboardData.group2
      state.chart = action.payload.dashboardData.group
    },
  },
});

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice;
