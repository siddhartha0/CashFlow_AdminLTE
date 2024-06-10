import { Component } from "react";
import PropTypes from "prop-types";

export default class StatsComps extends Component {
  constructor() {
    super();
  }
  static propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    children: PropTypes.any,
    color: PropTypes.any,
  };

  render() {
    const { title, amount, children, color } = this.props;
    return (
      <div className="d-flex ">
        <div className="d-flex flex-column">
          <p
            style={{
              color: color,
            }}
          >
            {title}
          </p>
          <p
            style={{
              marginTop: "-1rem",
            }}
          >
            {amount}
          </p>
        </div>
        <div className="ml-3">{children}</div>
      </div>
    );
  }
}
