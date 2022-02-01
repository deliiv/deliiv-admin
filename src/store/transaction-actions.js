import { transactionActions } from "./transaction-slice";
import UserService from "../services/user.service";

export const fetchTransactions = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await UserService.getAllTransaction();
      return response;
    };

    try {
      const res = await fetchData();
      dispatch(transactionActions.setTransaction({ transactions: res.data }));
    } catch (error) {
      console.log(error);
    }
  };
};
