import React, { Component } from "react";

class DynamicTable extends Component {
  render() {
    const { data, headers } = this.props;

    if (!data || data.length === 0) {
      return <p>No data available</p>;
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "5px" }}>#</th>
            {headers.map(({ key, label }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}.</td>
              {headers.map(({ key }) => (
                <td key={key}> Rs. {item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default DynamicTable;
