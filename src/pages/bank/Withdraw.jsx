import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import DynamicTable from "../../const/widget_component_model/DynamicTable";

export default class Withdraw extends Component {
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
          <div class="info-box mb-3 mr-3 bg-danger col-lg-3">
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

          <div class="info-box mb-3 bg-warning col-lg-3">
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
        </div>

        <div className="col-lg-9">
          <div className="card p-3">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={420}
            />
          </div>
        </div>

        {/* <div className="custom-card">
          <div className="card-header">
            <h3 className="card-title mt-2">{withdraw}</h3>
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
          </div> */}
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Active
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body p-0">
          <DynamicTable data={filteredTransactions} headers={headers} />
        </div>
      </div>
      // </div>
    );
  }
}
