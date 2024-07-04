import { Component } from "react";
import { Outlet } from "react-router-dom";

export default class HomeLayout extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="landing-page">
        <Outlet />
      </section>
    );
  }
}
