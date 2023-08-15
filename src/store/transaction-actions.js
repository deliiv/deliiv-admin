import { transactionActions } from "./transaction-slice";
import UserService from "../services/user.service";

export const fetchTransactions = () => {
  return async (dispatch) => {

    const fetchData2 = async () => {
      const response = await UserService.getAllPayment();
      return response;
    };

    try {
      const res2 = await fetchData2();
      dispatch(transactionActions.setTransaction({ allWitdrawalRequest:res2 }));
    } catch (error) {
      console.log(error);
    }
  };
};
