import { Component } from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import PropTypes from "prop-types";

export default class DisplayTrends extends Component {
  constructor() {
    super();
  }
  static propTypes = {
    status: PropTypes.string,
    trend: PropTypes.number,
    icon: PropTypes.any,
    label: PropTypes.string,
  };

  render() {
    const { status, amount, icon, label } = this.props;

    return (
      <div className="d-flex flex-column">
        {icon}

        <article className="text-dark text-opacity-95 mt-2 ">{label}</article>

        <span className="d-flex fx-5  align-items-center font-semibold text-hold text-opacity-55 ">
          Rs. {amount}
        </span>

        {/* <span className="d-flex fx-5  align-items-center font-semibold text-hold text-opacity-55 ">
          {status === "up" ? (
            <FaArrowTrendUp className="mr-2 text-warning" />
          ) : (
            <FaArrowTrendDown className="mr-2 text-danger" />
          )}
          {trend}% {status === "up" ? "up" : "down"}
        </span> */}
      </div>
    );
  }
}
