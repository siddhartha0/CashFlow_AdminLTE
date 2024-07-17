import { Component, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CashFlow from "./behindTheScene/CashFlow";
import Header from "./components/common/header/Header";
import NewSideBar from "./components/common/sidebar/NewSideBar";
import LocalStorageInitData from "./behindTheScene/helper/LocalStorageInitData.js";

export default function App() {
  const nav = useNavigate();

  const { token } = LocalStorageInitData();

  useEffect(() => {
    if (!token) {
      nav("/");
    }
  }, [nav, token]);
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
