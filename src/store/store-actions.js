import { storeActions } from "./store-slice";
import UserService from "../services/user.service";

export const fetchStore = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.getAllStoreProducts();

      return response;
    };

    try {
      const res = await fetchData();
      dispatch(storeActions.setStore({ allProducts: res.data }));
    } catch (error) {
      console.log(error);
    }
  };
};
