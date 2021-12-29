import { dashboardActions } from "./dashboard-slice";
import UserService from "../services/user.service";

export const loadBoard = () => {
  return async (dispatch) => {
    const fetchDashboardData = async () => {
      const response = await UserService.getDashboardData();
      return response;
    };

    try {
      const res = await fetchDashboardData();
      dispatch(dashboardActions.setDashboardData({ dashboardData: res.data.data }));
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchAvailableRegions = () => {
  return async (dispatch) => {
    const fetchDashboardData = async () => {
      const response = await UserService.fetchAvailableRegionData();
      return response;
    };

    try {
      const res = await fetchDashboardData();
      dispatch(dashboardActions.setDashboardData({ availableRegion: res.data }));
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchAvailableCategory = () => {
  return async (dispatch) => {
    const fetchAvailableCategories = async () => {
      const response = await UserService.fetchAvailableCategories();
      return response;
    };

    try {
      const res = await fetchAvailableCategories();
      dispatch(dashboardActions.setDashboardData({ categories: res.data.category }));
    } catch (error) {
      console.log(error);
    }
  };
};
