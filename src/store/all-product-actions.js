import { allProductActions } from "./all-product-slice";
import UserService from "../services/user.service";

export const fetchAllProducts = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.allProducts();
      return response;
    };

    try {
      const res = await fetchData();
      dispatch(allProductActions.setAllProducts({ products: res.data }));
    } catch (error) {
      console.log(error);
    }
  };
};
