import { Component } from "react";
import Header from "./components/header/Header";
import NewSideBar from "./components/sidebar/NewSideBar";
import { Outlet } from "react-router-dom";

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <NewSideBar />
        <Outlet />
        {/* <Footer /> */}
      </div>
    );
  }
}
