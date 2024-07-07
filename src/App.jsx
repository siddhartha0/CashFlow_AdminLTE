import { Component, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import CashFlow from "./behindTheScene/CashFlow";
import Header from "./components/common/header/Header";
import NewSideBar from "./components/common/sidebar/NewSideBar";
import { useDispatch, useSelector } from "react-redux";
import { userToken } from "./slices/slice/auth/AuthSlice";
import { useGetAllBanksQuery } from "./slices/api/admin/finance/BankApi";
import LocalData from "./behindTheScene/helper/LocalData";
import { storeBankData } from "./slices/slice/bank/BankSlice";

export default function App() {
  const token = useSelector(userToken);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetAllBanksQuery();

  useEffect(() => {
    const bankDataExists = LocalData.checkStorageExists("bank");

    if (!bankDataExists) {
      dispatch(storeBankData(data.entities));
    }

    if (!token) {
      nav("/");
    }
  }, [token, nav, data?.entities, dispatch]);
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
