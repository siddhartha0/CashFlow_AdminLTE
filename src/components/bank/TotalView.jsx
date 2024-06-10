import React, { Component } from "react";
import { Link } from "react-router-dom";

const designs = {
  "small-box": ({ title, data, color, icon, link }) => (
    <div className={`small-box bg-${color}`}>
      <div className="inner">
        <h3>{data}</h3>
        <p>{title}</p>
      </div>
      <div className="icon">
        <i className={icon}></i>
      </div>
      {link && (
        <Link to={link} className="small-box-footer">
          More info <i className="fas fa-arrow-circle-right"></i>
        </Link>
      )}
    </div>
  ),
  "info-box": ({ title, data, color, icon, change }) => (
    <div className={`info-box mb-3 bg-${color}`}>
      <span className="info-box-icon">
        <i className={icon}></i>
      </span>
      <div className="info-box-content">
        <span className="info-box-text">{title}</span>
        <span className="info-box-number">{data}</span>
        {change && (
          <>
            <div className="progress">
              <div
                className="progress-bar "
                style={{ width: `${Math.abs(change)}%` }}
              ></div>
            </div>
            <span className="progress-description">
              {change > 0
                ? `${change}% Increase in 30 Days`
                : `${Math.abs(change)}% Decrease in 30 Days`}
            </span>
          </>
        )}
      </div>
    </div>
  ),
};

export default class TotalView extends Component {
  render() {
    const { title, data, color, icon, design, change, link } = this.props;

    const DesignComponent = designs[design];

    return DesignComponent ? (
      <DesignComponent
        title={title}
        data={data}
        color={color}
        icon={icon}
        change={change}
        link={link}
      />
    ) : null;
  }
}
