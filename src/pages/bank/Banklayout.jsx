import { Component } from "react";
import { Outlet } from "react-router-dom";

export default class Banklayout extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <Outlet />
      </>
    );
  }
}
