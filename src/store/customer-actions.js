import { customerActions } from "./customer-slice";
import UserService from "../services/user.service";

export const fetchCustomers = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.getCustomers();

      return response;
    };

    try {
      const res = await fetchData();
      dispatch(customerActions.setCustomers({ usersData: res.data.users }));
    } catch (error) {
      console.log(error);
    }
  };
};
