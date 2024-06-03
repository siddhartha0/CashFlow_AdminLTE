import React, { Component } from "react";

class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "option1",
    };
  }

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.id });
  };

  getFilteredTransactions = () => {
    const { transactions, type } = this.props;
    const { selectedOption } = this.state;

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const isToday = transactionDate.toDateString() === today.toDateString();
      const isYesterday =
        transactionDate.toDateString() === yesterday.toDateString();
      const isSelectedDate =
        (selectedOption === "option1" && isToday) ||
        (selectedOption === "option2" && isYesterday);

      return isSelectedDate && transaction.type === type;
    });
  };

  render() {
    const { title } = this.props;
    const { selectedOption } = this.state;
    const filteredTransactions = this.getFilteredTransactions();

    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title mt-2">{title}</h3>
          <div className="card-tools">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label
                className={`btn btn-secondary ${
                  selectedOption === "option1" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  autoComplete="off"
                  checked={selectedOption === "option1"}
                  onChange={this.handleOptionChange}
                />
                Today
              </label>
              <label
                className={`btn btn-secondary ${
                  selectedOption === "option2" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  autoComplete="off"
                  checked={selectedOption === "option2"}
                  onChange={this.handleOptionChange}
                />
                Yesterday
              </label>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          {filteredTransactions.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "5px" }}>#</th>
                  <th>Bank Account</th>
                  <th>Purpose</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td>{index + 1}.</td>
                    <td>{transaction.account}</td>
                    <td>{transaction.purpose}</td>
                    <td>{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-3 text-center">No transactions found</div>
          )}
        </div>
      </div>
    );
  }
}

export default TransactionTable;
