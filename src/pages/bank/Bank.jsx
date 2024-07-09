import { Component } from "react";
import TransactionTable from "../../components/bank/TransactionTable";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import TotalView from "../../components/bank/TotalView";
import BarChart from "../../const/widget_component_model/charts/BarChart";
import TransactionChart from "../../components/bank/TransactionChart";
import BankList from "../../components/bank/BankList";
import { getTransactionPercentageIncrease } from "../../behindTheScene/bank/calculateIncreaseRate";
import axios from "axios";

const transactions = generateRandomTransactions(10000);

export default class Bank extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $(function () {
      $("#sortable").sortable();
    });
  }

  render() {
    const calculateTotals = () => {
      const { transactions } = this.state;
      const totals = {};

      transactions.forEach((transaction) => {
        if (!totals[transaction.bank]) {
          totals[transaction.bank] = {
            deposit: 0,
            withdraw: 0,
            account: transaction.account,
          };
        }

        if (transaction.status === "deposit") {
          totals[transaction.bank].deposit += transaction.amount;
        } else if (transaction.status === "withdraw") {
          totals[transaction.bank].withdraw += transaction.amount;
        }
      });

      this.setState({ totals });
    };
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

    const getTotalTransaction = (status) => {
      let total = transactions
        .filter((transaction) => transaction.status === status)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return total.toLocaleString();
    };

    return (
      <div className="bank p-3">
        <div className="row">
          {totalList.map((value, index) => (
            <div className="col-lg-3" key={index}>
              <TotalView
                data={getTotalTransaction(value.data)}
                title={value.title}
                color={value.color}
                icon={value.icon}
                key={index}
                design="info-box"
              />
            </div>
          ))}
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
