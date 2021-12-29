import { regionActions } from "./region-slice";
import UserService from "../services/user.service";

export const fetchRegion = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.fetchAvailableRegionData();
      return response;
    };

    try {
      const res = await fetchData();
      dispatch(regionActions.setRegion({ region: res.data }));
    } catch (error) {
      console.log(error);
    }
  };
};
