import { Component, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import CashFlow from "./behindTheScene/CashFlow";
import Header from "./components/common/header/Header";
import NewSideBar from "./components/common/sidebar/NewSideBar";
import { useDispatch } from "react-redux";
import LocalStorageInitData from "./behindTheScene/helper/LocalStorageInitData";
import { storeUserWalletData } from "./slices/slice/wallet/UserWalletSlice";
import { storeBankData } from "./slices/slice/bank/BankSlice";
import { storeWalletData } from "./slices/slice/wallet/WalletSlice";
import { storeUserBankData } from "./slices/slice/bank/UserBankSlice";

export default function App() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const {
    allBankData,
    allWalletData,
    token,
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
  } = LocalStorageInitData();

  useEffect(() => {
    if (!token) {
      nav("/");
    }

    if (!allbankFetchLoading && !allbankFetchError) {
      dispatch(storeBankData(allBankData?.entities ?? null));
    }

    if (!allwalletFetchLoading && !allwalletFetchError) {
      dispatch(storeWalletData(allWalletData?.entities ?? null));
    }

    if (!userbankFetchLoading && !userbankFetchError) {
      dispatch(storeUserBankData(userBank ?? null));
    }
    if (!userwalletFetchLoading && !userwalletFetchError) {
      dispatch(storeUserWalletData(userWallet ?? null));
    }
  }, [
    allBankData,
    allWalletData,
    allbankFetchError,
    allbankFetchLoading,
    allwalletFetchError,
    allwalletFetchLoading,
    dispatch,
    nav,
    token,
    userBank,
    userWallet,
    userbankFetchError,
    userbankFetchLoading,
    userwalletFetchError,
    userwalletFetchLoading,
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
