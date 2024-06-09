import { Component } from "react";
import TransactionTable from "../../components/bank/TransactionTable";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import TotalView from "../../components/bank/TotalView";
import BarChart from "../../const/widget_component_model/charts/BarChart";
import TransactionChart from "../../components/bank/TransactionChart";
import BankList from "../../components/bank/BankList";

export default class Bank extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    $(function () {
      $("#sortable").sortable();
    });
  }
  render() {
    const transactions = generateRandomTransactions(100);

    const totalList = [
      {
        data: "deposit",
        title: "Bank Balance",
        color: "primary",
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

    // console.log("Transactions: ", transactions);

    const getTotalTransaction = (status) => {
      let total = transactions
        .filter((transaction) => transaction.status === status)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return total.toLocaleString();
    };

    return (
      <div className="p-3">
        <div className="row">
          {totalList.map((value, index) => (
            <div className="col-lg-3">
              <TotalView
                data={getTotalTransaction(value.data)}
                title={value.title}
                color={value.color}
                icon={value.icon}
                key={index}
                design="info-box-2"
              />
            </div>
          ))}
          {/* <TotalView
            data={transactions.length}
            title="Total Transactions"
            color="primary"
            icon="fa-solid fa-money-bill-trend-up"
          /> */}
        </div>
        <div className="row" id="sortable">
          <div className="col-lg-12">
            <div className="custom-card p-3 ">
              <BarChart />
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
                type="all"
                title="Remarks"
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
      </div>
    );
  }
}
