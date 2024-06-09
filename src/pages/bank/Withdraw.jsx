import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import DynamicTable from "../../const/widget_component_model/DynamicTable";
import WithdrawBarChart from "../../const/widget_component_model/WithdrawBarChart";
import WithdrawPieChart from "../../const/widget_component_model/WithdrawPieChart";

export default class Withdraw extends Component {
  // constructor() {
  //   super();
  //   this.value = JSON.parse(localStorage.getItem("dashboard"));

  // this.state = {
  //   series: [
  //     {
  //       name: "Deposit",
  //       data: this.value.bankhistory,
  //     },
  //     {
  //       name: "Withdraw",
  //       data: this.value.walletHistory,
  //     },
  //   ],

  // options: {
  // chart: {
  //   height: 350,
  //   type: "line",
  //   zoom: {
  //     enabled: false,
  //   },
  // },
  // dataLabels: {
  //   enabled: false,
  // },
  // stroke: {
  //   curve: "straight",
  // },
  // title: {
  //   text: "Withdraw on monthly basis",
  //   align: "center",
  // },
  // grid: {
  //   row: {
  //     colors: ["#f3f3f3", "transparent"],
  //     opacity: 0.5,
  //   },
  // },
  // xaxis: {
  //   categories: this.value.label,
  // },
  // },
  // };
  // }
  render() {
    const transactions = generateRandomTransactions(15);

    const getTotalTransaction = (status) => {
      let total = transactions
        .filter((transaction) => transaction.status === status)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return total.toLocaleString();
    };

    const headers = [
      { key: "account", label: "Account" },
      { key: "bank", label: "Bank" },
      { key: "amount", label: "Amount" },
      { key: "type", label: "Type" },
      { key: "remarks", label: "Remarks" },
    ];

    const filteredTransactions = transactions.filter((transaction) => {
      return transaction.status === "withdraw";
    });

    return (
      <div>
        <div className="row">
          <div class="info-box mb-3 ml-3 mr-3 bg-danger col-lg-3">
            <span class="info-box-icon">
              <i class="far fa-comment"></i>
            </span>
            <div class="info-box-content">
              <span class="info-box-text">Total Withdraw</span>
              <span class="info-box-number">
                {getTotalTransaction("withdraw")}
              </span>
            </div>
          </div>

          <div class="info-box mb-3 mr-3 bg-warning col-lg-3">
            <span class="info-box-icon">
              <i class="far fa-comment"></i>
            </span>
            <div class="info-box-content">
              <span class="info-box-text">Total Withdraw This Month</span>
              <span class="info-box-number">
                {getTotalTransaction("withdraw")}
              </span>
            </div>
          </div>
          <div class="info-box mb-3 bg-success col-lg-3">
            <span class="info-box-icon">
              <i class="far fa-comment"></i>
            </span>
            <div class="info-box-content">
              <span class="info-box-text">Total Withdraw Last Month</span>
              <span class="info-box-number">
                {getTotalTransaction("withdraw")}
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="custom-card p-3">
            <WithdrawBarChart />
          </div>
          <div className="custom-card p-3">
            <WithdrawPieChart />
          </div>
          <div className="custom-card">
            <div className="card-header">
              <h3>Total Withdraws</h3>
            </div>
            <div className="card-body p-0">
              <DynamicTable data={filteredTransactions} headers={headers} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
