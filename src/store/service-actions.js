import { serviceActions } from "./serviceSlice";
import UserService from "../services/user.service";

export const fetchServices = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.getServices();

      return response;
    };

    try {
      const res = await fetchData();
      dispatch(serviceActions.setServices({ serviceData: res.data.services }));
      dispatch(serviceActions.setServiceObject({ service: res.data.services }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchParts = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.getParts();

      return response;
    };

    try {
      const res = await fetchData();
      dispatch(serviceActions.setParts({ partsData: res.data.part_category }));
    } catch (error) {
      console.log(error);
    }
  };
};
