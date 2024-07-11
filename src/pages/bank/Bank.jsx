import React, { useEffect, useState } from "react";
import TransactionTable from "../../components/bank/TransactionTable";
import TotalView from "../../components/bank/TotalView";
import BarChart from "../../const/widget_component_model/charts/BarChart";
import TransactionChart from "../../components/bank/TransactionChart";
import BankList from "../../components/bank/BankList";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { userbankDetails } from "../../slices/slice/bank/UserBankSlice";
import {
  useGetDepositOfUserBankByIdQuery,
  useGetWithdrawsOfUserBankByIdQuery,
} from "../../slices/api/transaction/TransactionApi";

export default function Bank() {
  const userbank = useSelector(userbankDetails);
  const [getSelectedBank, setSelectedBank] = useState(userbank[0]);
  const [bankDepositHistory, setBankDepositHistory] = useState([]);
  const [bankWithdrawHistory, setBankWithdrawHistory] = useState([]);

  const { data: depositHistory, isLoading: depositLoading } =
    useGetDepositOfUserBankByIdQuery(getSelectedBank?.id);
  const { data: withdrawHistory, isLoading: withdrawLoading } =
    useGetWithdrawsOfUserBankByIdQuery(getSelectedBank?.id);

  useEffect(() => {
    if (depositHistory?.entities) {
      const depositsData = depositHistory.entities;
      const storeBoth = {
        bankName: getSelectedBank.bankName,
        accountId: getSelectedBank.accountId,
        currentAmount: getSelectedBank.currentAmount,
      };
      const bank_and_deposit_data = depositsData.map((data) => ({
        ...data,
        ...storeBoth,
      }));
      setBankDepositHistory(bank_and_deposit_data);
    }
  }, [depositHistory, getSelectedBank]);

  useEffect(() => {
    if (withdrawHistory?.entities) {
      const withdrawalsData = withdrawHistory.entities;
      const storeBoth = {
        bankName: getSelectedBank.bankName,
        accountId: getSelectedBank.accountId,
        currentAmount: getSelectedBank.currentAmount,
      };
      const bank_and_withdraw_data = withdrawalsData.map((data) => ({
        ...data,
        ...storeBoth,
      }));
      setBankWithdrawHistory(bank_and_withdraw_data);
    }
  }, [withdrawHistory, getSelectedBank]);

  const selectBank = (bank) => {
    setSelectedBank(bank);
  };

  const getTotalTransaction = (type) => {
    const transactions =
      type === "deposit"
        ? bankDepositHistory
        : type === "withdraw"
        ? bankWithdrawHistory
        : [];
    const total = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    return total;
  };

  return (
    <BankWrapped
      userbank={userbank}
      selectBank={selectBank}
      depositLoading={depositLoading}
      withdrawLoading={withdrawLoading}
      getSelectedBank={getSelectedBank}
      bankDepositHistory={bankDepositHistory}
      bankWithdrawHistory={bankWithdrawHistory}
      getTotalTransaction={getTotalTransaction}
    />
  );
}

class BankWrapped extends React.Component {
  static propTypes = {
    userbank: PropTypes.array.isRequired,
    selectBank: PropTypes.func.isRequired,
    depositLoading: PropTypes.bool.isRequired,
    withdrawLoading: PropTypes.bool.isRequired,
    getSelectedBank: PropTypes.object.isRequired,
    bankDepositHistory: PropTypes.array.isRequired,
    bankWithdrawHistory: PropTypes.array.isRequired,
    getTotalTransaction: PropTypes.func.isRequired,
  };

  render() {
    const {
      userbank,
      selectBank,
      depositLoading,
      withdrawLoading,
      getSelectedBank,
      bankDepositHistory,
      bankWithdrawHistory,
      getTotalTransaction,
    } = this.props;

    console.log("Transaction:", bankWithdrawHistory);

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
        {depositLoading && <div>Data is loading....</div>}
        <div className="row mb-2">
          {userbank.map((bank) => (
            <div
              className="custom-card p-3 mr-4"
              key={bank.bankName}
              onClick={() => selectBank(bank)}
            >
              <header className="text-bold">{bank.bankName}</header>
              <p className="text-success mt-1">Rs. {bank.currentAmount}</p>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-3">
            <TotalView
              data={
                getTotalTransaction("deposit") + getTotalTransaction("withdraw")
              }
              title="Bank Balance"
              color="primary"
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
          <div className="col-lg-6">
            <div className="custom-card">
              <BankList
                transactions={bankDepositHistory.concat(bankWithdrawHistory)}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="custom-card p-3">
              <TransactionChart
                transactions={bankDepositHistory.concat(bankWithdrawHistory)}
                type="all"
                title="Remarks"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <TransactionTable
              transactions={bankDepositHistory}
              status="deposit"
              title="Deposit History"
            />
          </div>
          <div className="col-lg-6">
            <TransactionTable
              transactions={bankWithdrawHistory}
              status="withdraw"
              title="Withdraw History"
            />
          </div>
        </div>
      </div>
    );
  }
}
