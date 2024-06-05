import { Component } from "react";
import TransactionTable from "../../components/bank/TransactionTable";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import ComparisionDoubleBarChart from "../../const/widget_component_model/ComparisionDoubleBarChart";

export default class Bank extends Component {
  constructor() {
    super();
  }

  render() {
    const value = JSON.parse(localStorage.getItem("dashboard"));
    const transactions = generateRandomTransactions(15);
    const getTotalTransaction = (status) => {
      let total = transactions
        .filter((transaction) => transaction.status === status)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return total.toLocaleString();
    };

    return (
      <>
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
            <div className="custom-card p-3">
              <ComparisionDoubleBarChart
                title1="Deposit"
                data1={value.bankhistory}
                title2="withdraw"
                data2={value.walletHistory}
                label={value.label}
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
      </>
    );
  }
}
