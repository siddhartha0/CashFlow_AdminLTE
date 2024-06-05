import { Component } from 'react'
import { generateRandomTransactions } from "../../behindTheScene/api/bank";

export default class BalanceInfo extends Component {
  render() {
    const transactions = generateRandomTransactions(15);

    const getTotalTransaction = (status) => {
      let total = transactions
        .filter((transaction) => transaction.status === status)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return total.toLocaleString();
    };

    return (
      <div className="row ">
        <div className="col-lg-4 col-6  mb-3">
          <div className="info-box  bg-success ">
            <span className="info-box-icon">
              <i className="fas fa-tag"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Total Balance</span>
              <span className="info-box-number">
                {getTotalTransaction("deposit")}
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-6 mb-3">
          <div className="info-box bg-success">
            <span className="info-box-icon">
              <i className="far fa-heart"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Total Bank Balance</span>
              <span className="info-box-number">
                {getTotalTransaction("deposit")}
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-6 mb-3">
          <div className="info-box bg-success">
            <span className="info-box-icon">
              <i className="far fa-comment"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Total Wallet Balance</span>
              <span className="info-box-number">
                {getTotalTransaction("withdraw")}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
          <div className="info-box bg-secondary">
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
        </div> */}
      </div>
    );
  }
}
