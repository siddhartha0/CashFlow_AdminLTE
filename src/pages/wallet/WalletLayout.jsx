import { Component } from "react";
import { Outlet } from "react-router-dom";

export default class WalletLayout extends Component {
  constructor() {
    super();
    this.state = {
      path: window.location.pathname,
    };
  }

  render() {
    return (
      <>
        <Outlet />
      </>
    );
  }
}
