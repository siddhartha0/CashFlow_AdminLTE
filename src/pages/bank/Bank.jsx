import { Component } from "react";
import TransactionTable from "../../components/bank/TransactionTable";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import TotalView from "../../components/bank/TotalView";
import BarChart from "../../const/widget_component_model/charts/BarChart";
import TransactionChart from "../../components/bank/TransactionChart";
import BankList from "../../components/bank/BankList";
import { getTransactionPercentageIncrease } from "../../behindTheScene/bank/calculateIncreaseRate";
import axios from "axios";
import { useSelector } from "react-redux";
import { userbankDetails } from "../../slices/slice/bank/UserBankSlice";

const transactions = generateRandomTransactions(10000);

const fetchUsers = async () => {
  const { data } = await axios.get("http://localhost:3000/bank?pageNo=100");
  console.log(data);
  return data;
};

export default function Bank() {
  const userbank = useSelector(userbankDetails);

  return <BankWrapped userbank={userbank} />;
}

class BankWrapped extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $(function () {
      $("#sortable").sortable();
    });
  }

  render() {
    const { userbank } = this.props;
    console.log(userbank);
    // console.log("Data:", transactions);
    // console.log("Error:", error);

    // console.log("Backend Transaction:", transactions);
    // console.log("Transaction:", transactions);

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
        <div className="row mb-2" id="sortable">
          {userbank &&
            userbank.map((bank) => (
              <div className="custom-card p-3 mr-4 " key={bank.bankName}>
                <header className="text-bold">{bank.bankName}</header>
                <p className="text-success mt-1">Rs. {bank.currentAmount}</p>
              </div>
            ))}
        </div>

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
