import { usersAction } from "./users-slice";
import UserService from "../services/user.service";

export const fetchAllUsers = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.fetchAllUsers();
      console.log('>>>>>',response)
      return response;
    };

    try {
      const res = await fetchData();
      dispatch(
        usersAction.setUser({ userData: res.data.users })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchAllRiders = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.fetchAllRiders();
      console.log('>>>>>',response)
      return response;
    };

    try {
      const res = await fetchData();
      dispatch(
        usersAction.setRiders({ riderData: res.data.riders })
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
