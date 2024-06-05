import { Component } from "react";

export default class NewAccordian extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Monthly Recap Report</h5>
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
          <div className=" d-flex  mt-4 ml-2  ">{children}</div>
        </div>
      </div>
    );
  }
}
