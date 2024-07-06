import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Outlet } from "react-router-dom";
import CashFlow from "./behindTheScene/CashFlow";
import Header from "./components/common/header/Header";
import NewSideBar from "./components/common/sidebar/NewSideBar";

export default class App extends Component {
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
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    );
  }
}
