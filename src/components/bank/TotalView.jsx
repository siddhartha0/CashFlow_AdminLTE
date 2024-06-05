import React, { Component } from "react";

export default class TotalView extends Component {
  render() {
    const { title, data, color, icon } = this.props;

    return (
      <div className={`info-box mb-3 bg-${color}`}>
        <span className="info-box-icon">
          <i className={icon}></i>
        </span>
        <div className="info-box-content">
          <span className="info-box-text">{title}</span>
          <span className="info-box-number">{data}</span>
        </div>
      </div>
    );
  }
}
