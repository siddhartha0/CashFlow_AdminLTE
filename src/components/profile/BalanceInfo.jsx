import { Component } from 'react';
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/adminlte.min.css';

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
        <div className="card-body ">
          <div className="row mb-2">
            <div className="col-12">
              <div className="card bg-success h-100">
                <div className="card-body d-flex align-items-center ml-2 p-2">
                  <i className="fas fa-dollar-sign fa-2x text-white px-1 mr-3"></i>
                  <div>
                    <h6 className="text-white mb-0">Total Balance</h6>
                    <h4 className="text-white mt-1">
                      ${getTotalTransaction("deposit")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12">
              <div className="card bg-warning h-100">
                <div className="card-body d-flex align-items-center ml-2 p-2">
                  <i className="fas fa-university fa-2x text-white mr-3"></i>
                  <div>
                    <h6 className="text-white mb-0">Total Bank Balance</h6>
                    <h4 className="text-white mt-1">
                      ${getTotalTransaction("deposit")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12">
              <div className="card bg-info h-100">
                <div className="card-body d-flex align-items-center ml-2 p-2">
                  <i className="fas fa-wallet fa-2x text-white mr-3"></i>
                  <div>
                    <h6 className="text-white mb-0">Total Wallet Balance</h6>
                    <h4 className="text-white mt-1">
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
