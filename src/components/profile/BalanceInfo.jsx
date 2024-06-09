import { Component } from 'react';
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
      <div className="card bg-light">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">Balance Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="card bg-success h-100">
                <div className="card-body text-center">
                  <h6 className="text-white text-lg mb-0">Total Balance</h6>
                  <h4 className="text-white mt-2">
                    ${getTotalTransaction("deposit")}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="card bg-warning h-100">
                <div className="card-body text-center">
                  <h6 className="text-white text-lg mb-0">Total Bank Balance</h6>
                  <h4 className="text-white mt-2">
                    ${getTotalTransaction("deposit")}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="card bg-info h-100">
                <div className="card-body text-center">
                  <h6 className="text-white text-lg mb-0">Total Wallet Balance</h6>
                  <h4 className="text-white mt-2">
                    ${getTotalTransaction("withdraw")}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
