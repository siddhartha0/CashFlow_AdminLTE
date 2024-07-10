import { useSelector } from "react-redux";
import { userDetails } from "../../slices/slice/auth/AuthSlice";
import { userbankDetails } from "../../slices/slice/bank/UserBankSlice";
import { userWalletDetail } from "../../slices/slice/wallet/UserWalletSlice";
import { useGetAllTransactionQuery } from "../../slices/api/transaction/TransactionApi";
import { useEffect } from "react";

const HeadController = () => {
  const user_data = useSelector(userDetails ?? null);
  const user_Bank_Data = useSelector(userbankDetails ?? null);
  const user_wallet_Data = useSelector(userWalletDetail ?? null);

  const {
    data: transactionHistory,
    isLoading: transactionFetchLoading,
    isError: transactionFetchError,
  } = useGetAllTransactionQuery();

  const loadTime_DataSession = {
    id: user_Bank_Data[0]?.id ?? 0,
    value: user_Bank_Data[0]?.bankName ?? "",
  };

  useEffect(() => {
    if (transactionHistory) {
      const depositsData = transactionHistory?.entities?.filter(
        (history) => history.type === "deposit"
      );
      console.log(depositsData);
    }
  }, []);

  return {
    user_data,
    user_Bank_Data,
    user_wallet_Data,
    transactionHistory,
    transactionFetchError,
    transactionFetchLoading,
    loadTime_DataSession,
  };
};

export default HeadController;
