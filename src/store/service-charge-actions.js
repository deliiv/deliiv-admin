import { serviceChargeActions } from "./service-charge-slice";
import UserService from "../services/user.service";

export const fetchServiceCharge = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.getServiceCharge();
      return response;
    };

    try {
      const res = await fetchData();
      dispatch(serviceChargeActions.setServiceCharge({ serviceCharge: res.data }));
      // dispatch(orderActions.setNewOrders({ ordersData: res.data.orders }));
    } catch (error) {
      console.log(error);
    }
  };
};
