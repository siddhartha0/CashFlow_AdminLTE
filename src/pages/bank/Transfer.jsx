import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import TransactionTable from "../../components/bank/TransactionTable";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import TotalView from "../../components/bank/TotalView";
import BarChart from "../../const/widget_component_model/charts/BarChart";
import TransactionChart from "../../components/bank/TransactionChart";
import BankList from "../../components/bank/BankList";
import DateWiseChart from "../../components/bank/DateWiseChart";
import { getTransactionPercentageIncrease } from "../../behindTheScene/bank/calculateIncreaseRate";

const transactions = generateRandomTransactions(1000);

export default class Transfer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(function () {
      $("#sortable").sortable();
    });
  }

  getTotalTransaction = (status) => {
    let total = transactions
      .filter((transaction) => transaction.status === status)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return total.toLocaleString();
  };

  render() {
    const totalList = [
      {
        data: "deposit",
        title: "Bank Balance",
        color: "primary",
        icon: "fa-solid fa-building-columns",
      },
      {
        data: "transfer",
        title: "Total Transfer",
        color: "secondary",
        icon: "fa-solid fa-money-bill-transfer",
      },
    ];

    const withdrawValue = this.getTotalTransaction("withdraw"); // Total Withdraw value
    const depositValue = this.getTotalTransaction("deposit"); // Total Deposit value

    return (
      <div className="p-3">
        <div className="row">
          {totalList.map((value, index) => (
            <div className="col-lg-6" key={index}>
              {value.link ? (
                <Link to={value.link} className="text-decoration-none">
                  <TotalView
                    data={this.getTotalTransaction(value.data)}
                    title={value.title}
                    color={value.color}
                    icon={value.icon}
                    design="info-box"
                    change={getTransactionPercentageIncrease(
                      transactions,
                      value.data
                    )}
                  />
                </Link>
              ) : (
                <TotalView
                  data={this.getTotalTransaction(value.data)}
                  title={value.title}
                  color={value.color}
                  icon={value.icon}
                  design="info-box"
                  change={getTransactionPercentageIncrease(
                    transactions,
                    value.data
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="row" id="sortable">
          <div className="col-lg-6">
            <div className="custom-card p-3">
              <BarChart />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="custom-card p-3">
              <DateWiseChart />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="custom-card p-3">
              <BankList transactions={transactions} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="custom-card p-3">
              <TransactionChart
                transactions={transactions}
                type="transfer"
                title="% of Transfer"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <TransactionTable
              transactions={transactions}
              status="deposit"
              title="Transferred To"
            />
          </div>
          <div className="col-lg-6">
            <TransactionTable
              transactions={transactions}
              status="withdraw"
              title="Transferred From"
            />
          </div>
        </div>
      </div>
    );
  }
}
