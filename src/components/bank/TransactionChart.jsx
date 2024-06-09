import { Component } from "react";
import Chart from "react-apexcharts";

class TransactionChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.type === "all" ? "deposit" : props.type,
    };
  }

  filterTransactions = (option) => {
    const { transactions } = this.props;
    return transactions.filter((transaction) => transaction.status === option);
  };

  getFilteredData = () => {
    const { selectedOption } = this.state;
    const filteredTransactions = this.filterTransactions(selectedOption);
    const remarkAmounts = filteredTransactions.reduce((acc, transaction) => {
      acc[transaction.remarks] =
        (acc[transaction.remarks] || 0) + transaction.amount;
      return acc;
    }, {});
    return {
      labels: Object.keys(remarkAmounts),
      series: Object.values(remarkAmounts),
    };
  };

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  render() {
    const { type, title } = this.props;
    const { selectedOption } = this.state;
    const data = {
      series: this.getFilteredData().series,
      options: {
        chart: {
          type: "donut",
        },
        labels: this.getFilteredData().labels,
      },
    };

    return (
      <div>
        <div className="d-flex justify-content-between">
          <h3>{title}</h3>
          {type === "all" && (
            <div className="d-flex">
              <select
                className="custom-select"
                id="transactionType"
                onChange={this.handleOptionChange}
                value={selectedOption}
              >
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
          )}
        </div>

        <Chart
          options={data.options}
          series={data.series}
          type="pie"
          height={350}
        />
      </div>
    );
  }
}

export default TransactionChart;
