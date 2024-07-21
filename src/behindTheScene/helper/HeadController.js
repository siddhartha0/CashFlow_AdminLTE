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

  const [userLinkAccount, setUserLinkAccount] = useState([]);

  useEffect(() => {
    let combo = [];
    if (user_Bank_Data) {
      user_Bank_Data?.map((bank, i) => {
        const toStore = {
          id: bank.id,
          title: `Bank ${i + 1}`,
          value: bank.bankName,
        };
        combo.push(toStore);
      });
    }

    if (user_wallet_Data) {
      user_wallet_Data?.map((wallet, i) => {
        const toStore = {
          id: wallet?.id,
          title: `Wallet ${i + 1}`,
          value: wallet?.walletName,
        };
        combo.push(toStore);
      });
    }
    setUserLinkAccount(combo);
  }, [user_Bank_Data, user_wallet_Data]);

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

  const [userbankDataExists, setUserBankDataExists] = useState(false);
  const [userwalletDataExists, setUserWalletDataExists] = useState(false);

  useEffect(() => {
    if (user_Bank_Data) {
      if (user_Bank_Data.length) {
        setUserBankDataExists(true);
      } else {
        setUserBankDataExists(false);
      }
    }
    if (user_wallet_Data) {
      if (user_wallet_Data.length) {
        setUserWalletDataExists(true);
      } else {
        setUserWalletDataExists(false);
      }
    }
  }, [user_Bank_Data, user_wallet_Data]);

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
    userbankDataExists,
    userwalletDataExists,
    userLinkAccount,
  };
};

export default HeadController;
