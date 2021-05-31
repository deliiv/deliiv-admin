import { servicemanAction } from "./serviceman-slice";
import UserService from "../services/user.service";

export const fetchServicemen = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.getServicemen();

      return response;
    };

    try {
      const res = await fetchData();
      dispatch(
        servicemanAction.setServiceman({ servicemenData: res.data.serviceMan })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
