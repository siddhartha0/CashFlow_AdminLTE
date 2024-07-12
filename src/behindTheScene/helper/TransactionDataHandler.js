import { useEffect, useState } from "react";
import {
  useGetDepositOfUserBankByIdQuery,
  useGetWithdrawsOfUserBankByIdQuery,
} from "../../slices/api/transaction/TransactionApi";

const TransactionDataHandler = (selectedPlatform) => {
  const { data: bankdepositHistory, isLoading: bankdepositLoading } =
    useGetDepositOfUserBankByIdQuery(selectedPlatform?.id);

  const { data: bankwithdrawHistory, isLoading: bankwithdrawLoading } =
    useGetWithdrawsOfUserBankByIdQuery(selectedPlatform?.id);

  const [userbankDepositsData, setuserbankDepositsData] = useState();

  const [depositTotalAmount, setDepositTotalAmount] = useState();

  const [userbankWithdrawData, setuserbankWithdrawData] = useState();

  const [WithdrawTotalAmount, setWithdrawTotalAmount] = useState();

  useEffect(() => {
    if (bankdepositHistory) {
      const remarkAmounts = bankdepositHistory.entities.reduce(
        (acc, transaction) => {
          acc[transaction.source] =
            (acc[transaction.source] || 0) + transaction.amount;
          return acc;
        },
        {}
      );
      setuserbankDepositsData(remarkAmounts);

      const totalDeposit = bankdepositHistory.entities.reduce(
        (sum, deposit) => sum + deposit.amount,
        0
      );
      setDepositTotalAmount(totalDeposit);
    }

    if (bankwithdrawHistory) {
      const remarkAmounts = bankwithdrawHistory.entities.reduce(
        (acc, transaction) => {
          acc[transaction.source] =
            (acc[transaction.source] || 0) + transaction.amount;
          return acc;
        },
        {}
      );
      setuserbankWithdrawData(remarkAmounts);

      const totalWithdraw = bankwithdrawHistory.entities.reduce(
        (sum, Withdraw) => sum + Withdraw.amount,
        0
      );
      setWithdrawTotalAmount(totalWithdraw);
    }
  }, [bankdepositHistory, bankwithdrawHistory]);

  return {
    bankdepositHistory,
    bankdepositLoading,
    bankwithdrawHistory,
    bankwithdrawLoading,
    userbankDepositsData,
    depositTotalAmount,
    WithdrawTotalAmount,
    userbankWithdrawData,
  };
};

export default TransactionDataHandler;
