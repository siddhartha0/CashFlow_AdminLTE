import React, { useEffect, useState } from "react";
import TransactionTable from "../../components/bank/TransactionTable";
import TotalView from "../../components/bank/TotalView";
import BarChart from "../../const/widget_component_model/charts/BarChart";
import TransactionChart from "../../components/bank/TransactionChart";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { userbankDetails } from "../../slices/slice/bank/UserBankSlice";
import {
  useGetTransactionByMonthQuery,
  useGetTransactionByUserBankIdQuery,
} from "../../slices/api/transaction/TransactionApi";

export default function Bank() {
  const userbank = useSelector(userbankDetails);
  const [getSelectedBank, setSelectedBank] = useState(userbank[0]);
  const [transactions, setTransactions] = useState([]);
  const [monthly, setMonthly] = useState([]);

  const { data: monthlyTransaction, isLoading: monthlyTransactionLoading } =
    useGetTransactionByMonthQuery({ year: 2024 });
  const { data: transaction, isLoading: transactionLoading } =
    useGetTransactionByUserBankIdQuery({ id: getSelectedBank.id });

  useEffect(() => {
    setMonthly(monthlyTransaction);
    if (transaction?.entities) {
      setTransactions(transaction?.entities);
    }
  }, [monthlyTransaction, transaction]);

  const selectBank = (bank) => {
    setSelectedBank(bank);
  };

  const getTotalTransaction = (type) => {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.type === type
    );
    const total = filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    return total;
  };

  return (
    <BankWrapped
      userbank={userbank}
      selectBank={selectBank}
      getSelectedBank={getSelectedBank}
      getTotalTransaction={getTotalTransaction} // Pass the function as a prop
      monthlyTransaction={monthly}
      transactions={transactions}
      transactionLoading={transactionLoading}
    />
  );
}

class BankWrapped extends React.Component {
  static propTypes = {
    userbank: PropTypes.array,
    selectBank: PropTypes.func,
    getSelectedBank: PropTypes.object,
    monthlyTransaction: PropTypes.array,
    getTotalTransaction: PropTypes.func,
    transactions: PropTypes.array,
    transactionLoading: PropTypes.bool,
  };

  render() {
    const {
      userbank,
      selectBank,
      depositLoading,
      getSelectedBank,
      getTotalTransaction,
      transactions,
      transactionLoading,
    } = this.props;

    const totalList = [
      {
        type: "deposit",
        title: "Total Deposit",
        color: "warning",
        icon: "fa fa-heart",
      },
      {
        type: "withdraw",
        title: "Total Withdraw",
        color: "danger",
        icon: "fa-solid fa-arrow-up-from-bracket",
      },
      {
        type: "transfer",
        title: "Total Transfer",
        color: "secondary",
        icon: "fa-solid fa-money-bill-transfer",
      },
    ];

    return (
      <div className="bank p-3">
        {transactionLoading && <div>Data is loading....</div>}
        <div className="row mb-2 flex-nowrap">
          {userbank.map((bank) => (
            <div
              className={
                "custom-card p-3 mr-4" +
                (bank === getSelectedBank ? " bg-primary" : "")
              }
              key={bank.bankName}
              onClick={() => selectBank(bank)}
            >
              <header className="text-bold">{bank.bankName}</header>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-3">
            <TotalView
              data={getSelectedBank.currentAmount}
              title="Bank Balance"
              color="dark"
              icon="fa-solid fa-building-columns"
              design="info-box"
            />
          </div>
          {totalList.map((value, index) => (
            <div className="col-lg-3" key={index}>
              <TotalView
                data={getTotalTransaction(value.type)}
                title={value.title}
                color={value.color}
                icon={value.icon}
                design="info-box"
              />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="custom-card p-3">
              <BarChart />
            </div>
          </div>
          {/* <div className="col-lg-6">
            <div className="custom-card p-3">
              <BankList transactions={transactions} />
            </div>
          </div> */}
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
              type="deposit"
              title="Deposit History"
            />
          </div>
          <div className="col-lg-6">
            <TransactionTable
              transactions={transactions}
              type="withdraw"
              title="Withdraw History"
            />
          </div>
        </div>
      </div>
    );
  }
}
