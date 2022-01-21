import { bannerAction } from "./banner-slice";
import UserService from "../services/user.service";

export const fetchAllBanners = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.fetchAllBanners();
      return response;
    };

    try {
      const res = await fetchData();
      dispatch(
        bannerAction.setBanner({ bannerData: res.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
