import { Component } from "react";
import DynamicTable from "../../../const/widget_component_model/DynamicTable";
import { generateRandomTransactions } from "../../../behindTheScene/api/bank";
import SingleBarChart from "../../../const/widget_component_model/SingleBarChart";
import SingleLineChart from "../../../const/widget_component_model/SingleLineChart";

export default class Deposit extends Component {
  render() {
    const headers = [
      { key: "account", label: "Account" },
      { key: "bank", label: "Bank" },
      { key: "type", label: "Type" },
      { key: "amount", label: "Amount" },
    ];

    const transaction = generateRandomTransactions(100);
    const value = JSON.parse(localStorage.getItem("dashboard"));
    const filterData = transaction.filter((transaction) => {
      return transaction.status === "deposit";
    });

    const getTotalTransaction = (status) => {
      let total = transaction
        .filter((transaction) => transaction.status === status)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return total.toLocaleString();
    };

    return (
      <div className="container-fluid">
        <div className="w-100">
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
            <span className="info-box-icon">
              <i className="fa-solid fa-money-bill-trend-up"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Total Deposit Transactions</span>
              <span className="info-box-number">{filterData.length}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <SingleBarChart
                data={value.bankhistory}
                label={value.label}
                name={"Deposit"}
              />
            </div>

            <div className="col-lg-6">
              <SingleLineChart
                data={value.bankhistory}
                label={value.label}
                name={"Deposit"}
              />
            </div>
            <div className="col-12 mt-4">
              <h2>Total Deposits</h2>
              <DynamicTable data={filterData} headers={headers} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
