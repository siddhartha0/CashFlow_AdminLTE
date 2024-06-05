import { Component } from "react";
import TransactionTable from "../../components/bank/TransactionTable";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import TotalView from "../../components/bank/TotalView";
import BarChart from "../../const/widget_component_model/BarChart";
import DynamicChart from "../../const/widget_component_model/DynamicChart";
import TransactionChart from "../../components/bank/TransactionChart";

export default class Bank extends Component {
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
    const transactions = generateRandomTransactions(100);

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
      <div className="p-3">
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
