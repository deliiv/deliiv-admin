import { adminAction } from "./admin-slice";
import UserService from "../services/user.service";

export const fetchAllAdmins = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.fetchAllAdmins();
      return response;
    };

    try {
      const res = await fetchData();
      dispatch(
        adminAction.setAdmins({ adminData: res.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
