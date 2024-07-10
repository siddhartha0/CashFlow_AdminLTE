import { Component, useState } from "react";
import TransactionTable from "../../components/bank/TransactionTable";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import TotalView from "../../components/bank/TotalView";
import BarChart from "../../const/widget_component_model/charts/BarChart";
import TransactionChart from "../../components/bank/TransactionChart";
import BankList from "../../components/bank/BankList";
import PropTypes from "prop-types";
// import withQuery from "../../components/bank/withQuery";
import { useSelector } from "react-redux";
import { userbankDetails } from "../../slices/slice/bank/UserBankSlice";
import {
  useGetDepositOfUserBankByIdQuery,
  useGetWithdrawsOfUserBankByIdQuery,
} from "../../slices/api/transaction/TransactionApi";

const transactions = generateRandomTransactions(10000);

// const fetchUsers = async () => {
//   const { data } = await axios.get("http://localhost:3000/bank?pageNo=100");
//   console.log(data);
//   return data;
// };

export default function Bank() {
  const userbank = useSelector(userbankDetails);
  const [getSelectedBank, setSelectedBank] = useState(userbank[0]);
  const [bankDepositHistory, setBankDepositHistory] = useState();

  const { data: depositHistory, isLoading: depositLoading } =
    useGetDepositOfUserBankByIdQuery(getSelectedBank?.id);
  console.log(depositHistory.entities);

  const { data: withdrawHistory, isLoading: withdrawLoading } =
    useGetWithdrawsOfUserBankByIdQuery(getSelectedBank?.id);
  const selectBank = (bank = userbank[0]) => {
    setSelectedBank(bank);
    let depositsData = depositHistory.entities;
    console.log(depositsData);
    const storeBoth = {
      bankName: bank.bankName,
      accountId: bank.accountId,
      currentAmount: bank.currentAmount,
    };
    let bank_and_deposit_data = [];

    depositsData?.map((data) => {
      const mix = {
        ...data,
        ...storeBoth,
      };
      bank_and_deposit_data.push(mix);
    });
    console.log(bank_and_deposit_data);
    setBankDepositHistory(bank_and_deposit_data);
  };

  return (
    <BankWrapped
      userbank={userbank}
      selectBank={selectBank}
      depositHistory={depositHistory ?? null}
      depositLoading={depositLoading}
      withdrawHistory={withdrawHistory ?? null}
      withdrawLoading={withdrawLoading}
      getSelectedBank={getSelectedBank}
      bankDepositHistory={bankDepositHistory}
      // getSelectedBank={getSelectedBank}
    />
  );
}

class BankWrapped extends Component {
  static propTypes = {
    userbank: PropTypes.object,
    selectBank: PropTypes.func,
    depositHistory: PropTypes.array,
    depositLoading: PropTypes.bool,
    withdrawHistory: PropTypes.array,
    withdrawLoading: PropTypes.bool,
    getSelectedBank: PropTypes.object,
    bankDepositHistory: PropTypes.array,
  };

  componentDidMount() {
    $(function () {
      $("#sortable").sortable();
    });
  }

  render() {
    const {
      userbank,
      selectBank,
      depositHistory,
      depositLoading,
      withdrawHistory,
      withdrawLoading,
      getSelectedBank,
      bankDepositHistory,
    } = this.props;

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

    console.log(bankDepositHistory);

    return (
      <div className="bank p-3">
        {depositLoading && <div>Data is loading....</div>}

        <div className="row mb-2" id="sortable">
          {userbank &&
            userbank.map((bank) => (
              <div
                className="custom-card p-3 mr-4 "
                key={bank.bankName}
                onClick={() => selectBank(bank)}
              >
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
