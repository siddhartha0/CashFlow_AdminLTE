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
                <td key={key}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default DynamicTable;
