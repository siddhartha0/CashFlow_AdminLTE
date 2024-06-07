import { Component } from "react";
import PropTypes from "prop-types";

export default class ColorBarModel extends Component {
  static propTypes = {
    title: PropTypes.string,
    totalAmount: PropTypes.number,
    actualAmount: PropTypes.number,
    color: PropTypes.string,
  };

  render() {
    const { title, totalAmount, actualAmount, color } = this.props;
    return (
      <div className="progress-group d-flex flex-column">
        {title}

        <div className="d-flex align-items-center">
          <div
            className="progress progress-xxs "
            style={{
              width: "150px",
              height: "4px",
            }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${(actualAmount / totalAmount) * 100}px`,
                background: color,
              }}
            ></div>
          </div>
          <span className="ml-4">
            <b>{actualAmount}</b>/{totalAmount}
          </span>
        </div>
      </div>
    );
  }
}
