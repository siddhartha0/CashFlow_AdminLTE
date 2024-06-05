import React, { Component } from "react";

class DynamicTable extends Component {
  render() {
    const { data, headers, total } = this.props;

    const totalValue = data.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    if (!data || data.length === 0) {
      return <p>No data available</p>;
    }

    return (
      <table className="table table-responsive-sm">
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
                <td key={key}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
        {total && (
          <tfoot>
            <tr>
              <td colSpan={headers.length + 1}>
                <b>Total :</b> {totalValue.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    );
  }
}

export default DynamicTable;
