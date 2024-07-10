import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import RoutesPath from "../../../const/paths/RoutesPath";
import companyLogo from "../../../assets/pics/companylogo.png";

export default class NewSideBar extends Component {
  constructor() {
    super();
    this.state = {
      id: 1,
    };
  }

  activeLink(ID) {
    this.setState({
      id: ID,
    });
  }

  render() {
    return (
      <aside
        className="main-sidebar  elevation-2 "
        style={{
          height: "100vh",
          position: "fixed",
          top: "0",
          overflowY: "visible",
        }}
      >
        <Link to="/" className="container">
          <img
            src={companyLogo}
            alt="AdminLTE Logo"
            className=" img-circle elevation-2"
            style={{ opacity: 0.8, heigth: "10px", width: "70px" }}
          />
          <span className="font-weight-bold ml-2 text-uppercase">Cashflow</span>
        </Link>

        <div className="sidebar">
          <nav className="mt-4">
            <ul
              className="nav nav-pills nav-sidebar flex-column "
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {RoutesPath.map((routes) => (
                <li
                  className="place-items-center  nav-item  mt-4"
                  key={routes.id}
                >
                  <NavLink
                    to={routes.path}
                    className="nav-link "
                    onClick={this.activeLink.bind(this, routes.id)}
                  >
                    <img
                      src={routes.icons}
                      className="fas nav-icon  "
                      alt=""
                      style={{
                        height: "28px",
                      }}
                    />
                    <p className="ml-3 text-sm">
                      {routes.title}
                      {routes.children?.length > 0 ? (
                        <i className="right fas fa-angle-left"></i>
                      ) : (
                        ""
                      )}
                    </p>
                  </NavLink>

                  {routes.id === this.state.id && (
                    <ul className="nav nav-treeview ml-4">
                      {routes.children?.map((child) => (
                        <li className="nav-item" key={child.id}>
                          <NavLink to={child.path} className="nav-link">
                            <img
                              src={child.icons}
                              className="fas nav-icon "
                              alt=""
                            />
                            <p className="ml-3 text-sm">{child.title}</p>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}
