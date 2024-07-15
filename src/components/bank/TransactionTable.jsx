import { Component } from "react";
import DynamicTable from "../../const/widget_component_model/table/DynamicTable";
import PropTypes from "prop-types";

class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "today",
      selectedType: "deposit", // Default to "deposit"
    };
  }

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.id });
  };

  handleTypeChange = (e) => {
    this.setState({ selectedType: e.target.value });
  };

  static propTypes = {
    transactions: PropTypes.array,
    title: PropTypes.string,
  };

  getFilteredTransactions = () => {
    const { transactions } = this.props;
    const { selectedOption, selectedType } = this.state;

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.issuedAt);
      const isToday = transactionDate.toDateString() === today.toDateString();
      const isYesterday =
        transactionDate.toDateString() === yesterday.toDateString();
      const isSelectedDate =
        (selectedOption === "today" && isToday) ||
        (selectedOption === "yesterday" && isYesterday);

      const isSelectedType = transaction.type === selectedType;

      return isSelectedDate && isSelectedType;
    });
  };

  render() {
    const { title } = this.props;
    const { selectedOption, selectedType } = this.state;
    const filteredTransactions = this.getFilteredTransactions();

    const headers = [
      {
        key:
          selectedType === "deposit" ? "toBankAccountId" : "fromBankAccountId",
        label: "Account",
      },
      { key: "amount", label: "Amount" },
      { key: "type", label: "Type" },
      { key: "source", label: "Source" },
    ];

    return (
      <div className="custom-card">
        <div className="card-header">
          <h3 className="card-title mt-2">{title}</h3>
          <div className="card-tools d-flex">
            <select
              className="custom-select mr-2"
              value={selectedType}
              onChange={this.handleTypeChange}
            >
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
            </select>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label
                className={`btn btn-secondary ${
                  selectedOption === "today" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="options"
                  id="today"
                  autoComplete="off"
                  checked={selectedOption === "today"}
                  onChange={this.handleOptionChange}
                />
                Today
              </label>
              <label
                className={`btn btn-secondary ${
                  selectedOption === "yesterday" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="options"
                  id="yesterday"
                  autoComplete="off"
                  checked={selectedOption === "yesterday"}
                  onChange={this.handleOptionChange}
                />
                Yesterday
              </label>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          {filteredTransactions.length > 0 ? (
            <DynamicTable
              data={filteredTransactions}
              headers={headers}
              total={true}
              pageNo="5"
            />
          ) : (
            <div className="p-3 text-center">No transactions found</div>
          )}
        </div>
      </div>
    );
  }
}

export default TransactionTable;
