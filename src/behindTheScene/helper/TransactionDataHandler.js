import {
  useGetDepositOfUserBankByIdQuery,
  useGetWithdrawsOfUserBankByIdQuery,
} from "../../slices/api/transaction/TransactionApi";

const TransactionDataHandler = (selectedPlatform) => {
  const { data: bankdepositHistory, isLoading: bankdepositLoading } =
    useGetDepositOfUserBankByIdQuery(selectedPlatform?.id);

  const { data: bankwithdrawHistory, isLoading: bankwithdrawLoading } =
    useGetWithdrawsOfUserBankByIdQuery(selectedPlatform?.id);

  return {
    bankdepositHistory,
    bankdepositLoading,
    bankwithdrawHistory,
    bankwithdrawLoading,
  };
};

export default TransactionDataHandler;
