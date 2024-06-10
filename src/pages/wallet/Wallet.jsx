import { Component } from "react";
import TransactionTable from "../../components/bank/TransactionTable";
import ReactApexChart from "react-apexcharts";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";

export default class Wallet extends Component {
  constructor() {
    super();
    this.value = JSON.parse(localStorage.getItem("dashboard"));

    this.state = {
      series: [
        {
          name: "Deposit",
          data: this.value.bankhistory,
        },
        {
          name: "Withdraw",
          data: this.value.walletHistory,
        },
      ],

      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Balance Summary",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: this.value.label,
        },
      },
    };
  }

  render() {
    const transactions = generateRandomTransactions(10);

    const getTotalTransaction = (status) => {
      let total = transactions
        .filter((transaction) => transaction.status === status)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return total.toLocaleString();
    };

    return (
      <div className="row">
        <div className="col-lg-3">
          <div className="info-box mb-3 bg-dark">
            <span className="info-box-icon">
              <i className="fas fa-tag"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Bank Balance</span>
              <span className="info-box-number">
                {getTotalTransaction("deposit")}
              </span>
            </div>
          </div>

          <div className="info-box mb-3 bg-warning">
            <span className="info-box-icon">
              <i className="far fa-heart"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Total Deposit</span>
              <span className="info-box-number">
                {getTotalTransaction("deposit")}
              </span>
            </div>
          </div>

          <div className="info-box mb-3 bg-danger">
            <span className="info-box-icon">
              <i className="far fa-comment"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Total Withdraw</span>
              <span className="info-box-number">
                {getTotalTransaction("withdraw")}
              </span>
            </div>
          </div>

          <div className="info-box mb-3 bg-secondary">
            <span className="info-box-icon">
              <i className="far fa-heart"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Total Transfer</span>
              <span className="info-box-number">
                {getTotalTransaction("transfer")}
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="card p-3">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="line"
              height={420}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <TransactionTable
            transactions={transactions}
            status="deposit"
            title="Deposit History"
          />
        </div>
        <div className="col-lg-6">
          <TransactionTable
            transactions={transactions}
            status="withdraw"
            title="Withdraw History"
          />
        </div>
      </div>
    );
  }
}
