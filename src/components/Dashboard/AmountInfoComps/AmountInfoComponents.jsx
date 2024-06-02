import { Component } from "react";
import PropTypes from "prop-types";
export default class AmountInfoComponents extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    icon: PropTypes.any,
    label: PropTypes.string,
    amount: PropTypes.number,
  };

  render() {
    const { icon, label, amount } = this.props;
    return (
      <div className="d-flex align-items-center ">
        <div className="d-flex flex-column justify-contents-between  ">
          <article className="text-dark text-opacity-95 mt-2 ">{label}</article>

          <span className="d-flex fx-5  align-items-center font-semibold text-hold text-opacity-55 ">
            {amount}
          </span>
        </div>
        <div className="ml-4">{icon}</div>
      </div>
    );
  }
}
