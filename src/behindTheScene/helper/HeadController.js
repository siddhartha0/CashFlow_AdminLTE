import { useSelector } from "react-redux";
import { userDetails } from "../../slices/slice/auth/AuthSlice";
import { userbankDetails } from "../../slices/slice/bank/UserBankSlice";
import { userWalletDetail } from "../../slices/slice/wallet/UserWalletSlice";
import { useGetAllTransactionQuery } from "../../slices/api/transaction/TransactionApi";
import { useEffect, useState } from "react";

const HeadController = () => {
  const user_data = useSelector(userDetails ?? null);
  const user_Bank_Data = useSelector(userbankDetails ?? null);
  const user_wallet_Data = useSelector(userWalletDetail ?? null);

  const [depositHistory, setDepositHistory] = useState();
  const [totalDeposits, setTotalDeposits] = useState();
  const [totalWithdraw, setTotalwithdraw] = useState();

  const [withdrawHistory, setwithdrawHistory] = useState();

  const {
    data: transactionHistory,
    isLoading: transactionFetchLoading,
    isError: transactionFetchError,
  } = useGetAllTransactionQuery();

  const loadTime_DataSession = {
    id: user_Bank_Data ? user_Bank_Data[0]?.id : 0,
    value: user_Bank_Data ? user_Bank_Data[0]?.bankName : "",
  };

  useEffect(() => {
    if (transactionHistory) {
      const depositsData = transactionHistory?.entities?.filter(
        (history) => history.type === "deposit"
      );

      if (depositsData.length) {
        const totalamount = depositsData.map((data) => data.amount);
        const total = totalamount?.reduce((a, b) => a + b);
        setTotalDeposits(total);
      }
      setDepositHistory(depositsData);

      const withdrawData = transactionHistory?.entities?.filter(
        (history) => history.type === "withdraw"
      );

      if (withdrawData.length) {
        const totalamount = withdrawData?.map((data) => data.amount);
        if (totalamount) {
          const total = totalamount?.reduce((a, b) => a + b);
          setTotalwithdraw(total);
        }
      }
      setwithdrawHistory(withdrawData);
    }
  }, [transactionHistory]);

  return {
    user_data,
    user_Bank_Data,
    user_wallet_Data,
    transactionHistory,
    transactionFetchError,
    transactionFetchLoading,
    loadTime_DataSession,
    depositHistory,
    withdrawHistory,
    totalDeposits,
    totalWithdraw,
  };
};

export default HeadController;
