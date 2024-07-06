import { Component, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import CashFlow from "./behindTheScene/CashFlow";
import Header from "./components/common/header/Header";
import NewSideBar from "./components/common/sidebar/NewSideBar";
import { useSelector } from "react-redux";
import { userToken } from "./slices/slice/auth/AuthSlice";

export default function App() {
  // const token = useSelector(userToken);
  // const nav = useNavigate();
  // useEffect(() => {
  //   if (!token) {
  //     nav("/");
  //   }
  // }, [token, nav]);
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
