import React, { Component } from "react";

class DynamicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: this.props.pageNo || 10,
    };
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  handleNavigationClick = (event, direction) => {
    event.preventDefault();

    const { currentPage } = this.state;
    const totalPages = Math.ceil(
      this.props.data.length / this.state.itemsPerPage
    );

    if (direction === "prev" && currentPage > 1) {
      this.setState({
        currentPage: currentPage - 1,
      });
    } else if (direction === "next" && currentPage < totalPages) {
      this.setState({
        currentPage: currentPage + 1,
      });
    }
  };

  render() {
    const { data, headers, total } = this.props;
    const { currentPage, itemsPerPage } = this.state;

    // Logic for displaying current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for displaying page numbers
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const totalValue = data.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    if (!data || data.length === 0) {
      return <p>No data available</p>;
    }

    return (
      <>
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
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{indexOfFirstItem + index + 1}.</td>
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

        {data.length > this.state.itemsPerPage && (
          <ul className="pagination justify-content-end mr-5">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => this.handleNavigationClick(e, "prev")}
              >
                «
              </a>
            </li>
            {pageNumbers.map((number) => (
              <li
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
                key={number}
              >
                <a
                  className="page-link"
                  id={number}
                  onClick={(e) => this.handleClick(e)}
                >
                  {number}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => this.handleNavigationClick(e, "next")}
              >
                »
              </a>
            </li>
          </ul>
        )}
      </>
    );
  }
}

export default DynamicTable;
