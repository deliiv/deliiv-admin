import { usersAction } from "./users-slice";
import UserService from "../services/user.service";

export const fetchAllUsers = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.fetchAllUsers();
      return response;
    };

    try {
      const res = await fetchData();
      dispatch(
        usersAction.setUser({ userData: res.data.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
