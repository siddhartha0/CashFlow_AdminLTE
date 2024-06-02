import { Component } from "react";
import Header from "./components/header/Header";
import NewSideBar from "./components/sidebar/NewSideBar";
import { Outlet } from "react-router-dom";
import CashFlow from "./behindTheScene/CashFlow";

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
        <div className="content-wrapper">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}
