import { sellersAction } from "./sellers-slice";
import UserService from "../services/user.service";

export const fetchAllSellers = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.getAllSellers();
      return response;
    };
    const fetchDataW = async () => {
      const response2 = await UserService.getSellerDetails(1);
      return response2;
    };

    try {
      const res = await fetchData();
      const res2 = await fetchDataW();
      dispatch(
        sellersAction.setSeller({ sellerData: res.data.data })
      );
      // dispatch(
      //   sellersAction.loadSellerOrdersAndProducts({ seller_details: res2.data })
      // );
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchSellerDetails = (id) => {
  return async (dispatch) => {

    const fetchDataW = async () => {
      const response2 = await UserService.getSellerDetails(id);
      return response2;
    };

    try {
      const res2 = await fetchDataW();
      dispatch(
        sellersAction.loadSellerOrdersAndProducts({ seller_details: res2.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
