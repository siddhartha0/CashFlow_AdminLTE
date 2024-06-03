import { Component } from "react";
import { Outlet } from "react-router-dom";

export default class WalletLayout extends Component {
  constructor() {
    super();
    this.state = {
      path: window.location.pathname,
    };
    console.log(this.state.path);
  }

  componentDidMount() {
    console.log(window.location.pathname);
  }

  render() {
    return (
      <>
        <Outlet />
      </>
    );
  }
}
