import { Component, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import CashFlow from "./behindTheScene/CashFlow";
import Header from "./components/common/header/Header";
import NewSideBar from "./components/common/sidebar/NewSideBar";
import { useDispatch, useSelector } from "react-redux";
import { userToken } from "./slices/slice/auth/AuthSlice";
import { useGetAllBanksQuery } from "./slices/api/admin/finance/BankApi";
import { useGetAllWalletQuery } from "./slices/api/admin/finance/WalletApi";
import LocalData from "./behindTheScene/helper/LocalData";
import { storeBankData } from "./slices/slice/bank/BankSlice";
import { useGetAllLinkBankQuery } from "./slices/api/bank/UserBankApi";
import { useGetUsersAllWalletQuery } from "./slices/api/wallet/UserWalletApi";

import { storeWalletData } from "./slices/slice/wallet/WalletSlice";
import { storeUserWalletData } from "./slices/slice/wallet/UserWalletSlice";
import { storeUserBankData } from "./slices/slice/bank/UserBankSlice";

export default function App() {
  const token = useSelector(userToken);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { data: allBankData } = useGetAllBanksQuery();
  const { data: allWalletData } = useGetAllWalletQuery();
  const { data: userBank } = useGetAllLinkBankQuery();
  const { data: userWallet } = useGetUsersAllWalletQuery();

  useEffect(() => {
    const bankDataExists = LocalData.checkStorageExists("bank");

    const userBankDataExists = LocalData.checkStorageExists("userbank");

    const walletDataExists = LocalData.checkStorageExists("wallet");

    const userWalletDataExists = LocalData.checkStorageExists("userbank");

    if (!token) {
      nav("/");
    }

    if (!walletDataExists) {
      if (allWalletData) {
        dispatch(storeWalletData(allWalletData?.entities));
      }
      // dispatch();
    }

    if (!userWalletDataExists) {
      // dispatch();
      if (userWallet) {
        dispatch(storeUserWalletData(userWallet));
      }
    }

    if (!bankDataExists) {
      if (allBankData)
        if (allBankData) dispatch(storeBankData(allBankData?.entities));
    }
    if (!userBankDataExists) {
      if (userBank) dispatch(storeUserBankData(userBank));
    }
  }, [
    token,
    nav,
    dispatch,
    allBankData?.entities,
    userBank,
    allWalletData,
    userWallet,
    allBankData,
  ]);
  return <AppWrapped />;
}

class AppWrapped extends Component {
  constructor() {
    super();
    this.getData();
  }

  getData() {
    new CashFlow().balanceCaller();
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <NewSideBar />
        <div className="content-wrapper p-3">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}
