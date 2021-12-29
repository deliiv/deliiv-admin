import { categoryAction } from "./category-slice";
import UserService from "../services/user.service";

export const fetchAllCategories = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.fetchAvailableCategories();
      return response;
    };

    try {
      const res = await fetchData();
      dispatch(
        categoryAction.setCategory({ categoryData: res.data.category })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
