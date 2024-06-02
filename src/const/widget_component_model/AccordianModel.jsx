import { Component } from "react";
import PropTypes from "prop-types";

export default class AccordianModel extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
  };

  render() {
    const { title, children } = this.props;
    return (
      <div id="accordion">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link "
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                style={{
                  color: "#9B4078",
                  fontWeight: 600,
                }}
              >
                {title}
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="card-body">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}
