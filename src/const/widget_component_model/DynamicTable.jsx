import React, { Component } from "react";

class DynamicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 10,
    };
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  render() {
    const { data, headers } = this.props;
    const { currentPage, itemsPerPage } = this.state;

    // Logic for displaying current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    if (!data || data.length === 0) {
      return <p>No data available</p>;
    }

    //handle click
    const handleClick = (event, direction) => {
      event.preventDefault(); // Prevent default link behavior

      const { currentPage } = this.state;

      if (direction === "prev" && currentPage > 1) {
        this.setState({
          currentPage: currentPage - 1,
        });
      } else if (direction === "next") {
        this.setState({
          currentPage: currentPage + 1,
        });
      }
    };

    return (
      <div className="custom-card">
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
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{indexOfFirstItem + index + 1}.</td>
                {headers.map(({ key }) => (
                  <td key={key}>Rs. {item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="pagination justify-content-end mr-5 ">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={(e) => handleClick(e, "prev")}
            >
              Previous
            </a>
          </li>
          {pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <a
                className="page-link"
                id={number}
                onClick={(e) => this.handleClick(e, "page")}
              >
                {number}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={(e) => handleClick(e, "next")}
            >
              Next
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default DynamicTable;
