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

export const fetchUserDetails = (id) => {
  return async (dispatch) => {

    const fetchData = async () => {
      const response2 = await UserService.getUserDetails(id);
      return response2;
    };

    try {
      const res2 = await fetchData();
      dispatch(
        usersAction.loadUserDetails({ user_detail: res2.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
};