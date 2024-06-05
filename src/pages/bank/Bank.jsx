import { Component } from "react";
import TransactionTable from "../../components/bank/TransactionTable";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import TotalView from "../../components/bank/TotalView";
import BarChart from "../../const/widget_component_model/BarChart";
import DynamicChart from "../../const/widget_component_model/DynamicChart";
import TransactionChart from "../../components/bank/TransactionChart";

export default class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [10, 20, 30, 40, 50],
      title: "Dynamic Chart",
      chartType: "bar",
    };
  }
  render() {
    const transactions = generateRandomTransactions(50);

    const totalList = [
      {
        data: "deposit",
        title: "Bank Balance",
        color: "dark",
        icon: "fa-solid fa-building-columns",
      },
      {
        data: "deposit",
        title: "Total Deposit",
        color: "warning",
        icon: "fa fa-heart",
      },
      {
        data: "withdraw",
        title: "Total Withdraw",
        color: "danger",
        icon: "fa-solid fa-arrow-up-from-bracket",
      },
      {
        data: "transfer",
        title: "Total Transfer",
        color: "secondary",
        icon: "fa-solid fa-money-bill-transfer",
      },
    ];

    console.log(transactions);

    const getTotalTransaction = (status) => {
      let total = transactions
        .filter((transaction) => transaction.status === status)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return total.toLocaleString();
    };

    return (
      <div className="content-wrapper p-3">
        <div className="row">
          <div className="col-lg-3">
            {totalList.map((value, index) => (
              <TotalView
                data={getTotalTransaction(value.data)}
                title={value.title}
                color={value.color}
                icon={value.icon}
                key={index}
              />
            ))}
            <TotalView
              data={transactions.length}
              title="Total Transactions"
              color="primary"
              icon="fa-solid fa-money-bill-trend-up"
            />
          </div>
          <div className="col-lg-9">
            <div className="custom-card p-3">
              <BarChart />
              {/* <DynamicChart
                data={this.state.data}
                title={this.state.title}
                chartType={this.state.chartType}
              /> */}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="custom-card p-3">
              <TransactionChart transactions={transactions} />
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
      </div>
    );
  }
}
