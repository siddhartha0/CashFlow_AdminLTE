import { Component } from "react";
import PropTypes from "prop-types";

export default class MoreOptionalAccordianModel extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
  };
  render() {
    const { children, title } = this.props;
    return (
      <div className="card">
        <div
          className="card-header"
          style={{
            // background: "linear-gradient(to left, #FD746C, #2C3E50)",
            background: "linear-gradient(to left, #423C83, #35A1BE)",
          }}
        >
          <h5 className="card-title text-white">{title}</h5>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
            >
              <i className="fas fa-minus"></i>
            </button>

            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="remove"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className=" d-flex flex-column ml-2  ">{children}</div>
        </div>
      </div>
    );
  }
}
