import React, { Component } from "react";

const designs = {
  "small-box": ({ title, data, color, icon }) => (
    <div className={`small-box bg-${color}`}>
      <div className="inner">
        <h3>{data}</h3>
        <p>{title}</p>
      </div>
      <div className="icon">
        <i className={icon}></i>
      </div>
      <a href="#" className="small-box-footer">
        More info <i className="fas fa-arrow-circle-right"></i>
      </a>
    </div>
  ),
  "info-box-1": ({ title, data, color, icon }) => (
    <div className={`info-box mb-3 bg-${color}`}>
      <span className="info-box-icon">
        <i className={icon}></i>
      </span>
      <div className="info-box-content">
        <span className="info-box-text">{title}</span>
        <span className="info-box-number">{data}</span>
      </div>
    </div>
  ),
  "info-box-2": ({ title, data, color, icon }) => (
    <div className={`info-box bg-${color}`}>
      <span className="info-box-icon">
        <i className={icon}></i>
      </span>
      <div className="info-box-content">
        <span className="info-box-text">{title}</span>
        <span className="info-box-number">{data}</span>
        <div className="progress">
          <div className="progress-bar" style={{ width: "70%" }}></div>
        </div>
        <span className="progress-description">70% Increase in 30 Days</span>
      </div>
    </div>
  ),
};

export default class TotalView extends Component {
  render() {
    const { title, data, color, icon, design } = this.props;

    const DesignComponent = designs[design];

    return DesignComponent ? (
      <DesignComponent title={title} data={data} color={color} icon={icon} />
    ) : null;
  }
}
