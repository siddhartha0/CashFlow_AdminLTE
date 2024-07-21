import { useDispatch, useSelector } from "react-redux";
import { useGetAllBanksQuery } from "../../slices/api/admin/finance/BankApi";
import { useGetAllWalletQuery } from "../../slices/api/admin/finance/WalletApi";
import { useGetAllLinkBankQuery } from "../../slices/api/bank/UserBankApi";
import { useGetUsersAllWalletQuery } from "../../slices/api/wallet/UserWalletApi";
import { userToken } from "../../slices/slice/auth/AuthSlice";
import { useEffect } from "react";
import { storeBankData } from "../../slices/slice/bank/BankSlice";
import { storeWalletData } from "../../slices/slice/wallet/WalletSlice";
import { storeUserBankData } from "../../slices/slice/bank/UserBankSlice";
import { storeUserWalletData } from "../../slices/slice/wallet/UserWalletSlice";

const LocalStorageInitData = () => {
  const token = useSelector(userToken);
  const {
    data: allBankData,
    isLoading: allbankFetchLoading,
    isError: allbankFetchError,
  } = useGetAllBanksQuery();
  const {
    data: allWalletData,
    isLoading: allwalletFetchLoading,
    isError: allwalletFetchError,
  } = useGetAllWalletQuery();
  const {
    data: userBank,
    isLoading: userbankFetchLoading,
    isError: userbankFetchError,
  } = useGetAllLinkBankQuery();
  const {
    data: userWallet,
    isLoading: userwalletFetchLoading,
    isError: userwalletFetchError,
  } = useGetUsersAllWalletQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allbankFetchLoading && !allbankFetchError) {
      dispatch(storeBankData(allBankData?.entities ?? []));
    }

    if (!allwalletFetchError && !allwalletFetchLoading) {
      dispatch(storeWalletData(allWalletData?.entities ?? []));
    }

    if (!userbankFetchError && !userbankFetchLoading) {
      dispatch(storeUserBankData(userBank ?? []));
    }

    if (!userwalletFetchError && !userwalletFetchLoading) {
      dispatch(storeUserWalletData(userWallet ?? []));
    }
  }, [
    allBankData,
    allBankData?.entities,
    allWalletData?.entities,
    allbankFetchError,
    allbankFetchLoading,
    allwalletFetchError,
    allwalletFetchLoading,
    dispatch,
    userBank,
    userWallet,
    userbankFetchError,
    userbankFetchLoading,
    userwalletFetchError,
    userwalletFetchLoading,
  ]);

  // const storeallBankData = () => {
  //   const bankDataExists = LocalData.checkStorageExists("bank");

  //   if (!allbankFetchLoading && !allbankFetchError) {
  //     if (!bankDataExists) dispatch(storeBankData(allBankData));
  //   }
  // };

  // const storeallWalletData = () => {
  //   const walletDataExists = LocalData.checkStorageExists("wallet");
  //   if (!allwalletFetchLoading && !allwalletFetchError) {
  //     if (!walletDataExists) dispatch(storeWalletData(allWalletData));
  //   }
  // };

  // const storeuserBankData = () => {
  //   const userBankDataExists = LocalData.checkStorageExists("userbank");

  //   if (!userbankFetchLoading && !userbankFetchError) {
  //     if (!userBankDataExists) dispatch(storeuserBankData(userBank));
  //   }
  // };

  // const storeuserWalletData = () => {
  //   const userWalletDataExists = LocalData.checkStorageExists("userbank");

  //   if (!userwalletFetchLoading && !userwalletFetchError) {
  //     if (!userWalletDataExists) dispatch(storeUserWalletData(userWallet));
  //   }
  // };

  return {
    token,
    allBankData,
    allWalletData,
    userBank,
    userWallet,
    allbankFetchError,
    allbankFetchLoading,
    allwalletFetchError,
    allwalletFetchLoading,
    userbankFetchError,
    userbankFetchLoading,
    userwalletFetchError,
    userwalletFetchLoading,
  };
};

export default LocalStorageInitData;
