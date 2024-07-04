import { Component } from "react";
import TotalView from "../../components/bank/TotalView";
import ReactApexChart from "react-apexcharts";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import DynamicTable from "../../const/widget_component_model/table/DynamicTable";
import WithdrawBarChart from "../../const/widget_component_model/WithdrawBarChart";
import TransactionChart from "../../components/bank/TransactionChart";

export default class Withdraw extends Component {
  render() {
    const transactions = generateRandomTransactions(15);

    const totalList = [
      {
        data: "withdraw",
        title: "Total Withdraw",
        color: "danger",
        icon: "fa-solid fa-arrow-up-from-bracket",
      },
      {
        data: "transfer",
        title: "Total Withdraw This Month",
        color: "info",
        icon: "fa-solid fa-money-bill-transfer",
      },
      {
        data: "deposit",
        title: "Total Withdraw Last Month",
        color: "warning",
        icon: "fa fa-heart",
      },
    ];

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
          {totalList.map((value, index) => (
            <div className="col-lg-3">
              <TotalView
                data={getTotalTransaction(value.data)}
                title={value.title}
                color={value.color}
                icon={value.icon}
                key={index}
                design="small-box"
              />
            </div>
          ))}
        </div>
        <div className="col-lg-12">
          <div className="custom-card">
            <div className="card-header bg-info">
              <h3>Withdraw Bar Chart</h3>
            </div>
            <div className="custom-card">
              <WithdrawBarChart />
            </div>
          </div>
          <div className="custom-card">
            <div className="card-header bg-danger">
              <h3>Withdraw Pie Chart</h3>
            </div>
            <TransactionChart transactions={transactions} type="withdraw" />
          </div>
          <div className="custom-card">
            <div className="card-header bg-success row">
              <h3>Total Withdraws</h3>
            </div>
            <div className="card-body p-0">
              <DynamicTable data={filteredTransactions} headers={headers} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
