import { Component } from "react";
import headers from "../../../const/ActivityHeader";
import PropTypes from "prop-types";

export default class ActivityHeader extends Component {
  static propTypes = {
    currentId: PropTypes.number,
    selectMenu: PropTypes.func,
  };
  render() {
    const { currentId, selectMenu } = this.props;

    return (
      <div className="d-flex">
        {headers.map((menu) => (
          <header
            id="menu"
            key={menu.value}
            onClick={() => selectMenu(menu.id)}
            className="mr-4  nav-link active   text-md"
            style={{
              cursor: "pointer",
              background: `${currentId === menu.id ? "#3794B7" : ""} `,
            }}
          >
            {menu.title}
          </header>
        ))}
      </div>
    );
  }
}
