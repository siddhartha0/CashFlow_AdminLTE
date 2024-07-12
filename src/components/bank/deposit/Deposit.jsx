import { Component, useEffect, useState } from "react";
import SingleBarChart from "../../../const/widget_component_model/charts/SingleBarChart";
import SingleLineChart from "../../../const/widget_component_model/charts/SingleLineChart";
import TotalView from "../TotalView";
// import ChartComponent from "../Chart";
import { useSelector } from "react-redux";
import TransactionChart from "../TransactionChart";
import DownloadButton from "../../../const/DownloadButton";
import PropTypes from "prop-types";
import { userbankDetails } from "../../../slices/slice/bank/UserBankSlice";
import { useGetTransactionByUserBankIdQuery } from "../../../slices/api/transaction/TransactionApi";
import { Link } from "react-router-dom";
import TransactionTable from "../TransactionTable";

export default function Deposit() {
  const userbank = useSelector(userbankDetails);
  const [transactions, setTransactions] = useState([]);
  const [getSelectedBank, setSelectedBank] = useState(userbank[0]);

  const { data: transaction, isLoading: transactionLoading } =
    useGetTransactionByUserBankIdQuery({ id: getSelectedBank.id });

  useEffect(() => {
    if (transaction?.entities) {
      setTransactions(transaction?.entities);
    }
  }, [transaction]);

  const selectBank = (bank) => {
    setSelectedBank(bank);
  };

  const getTotalTransaction = (type) => {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.type === "deposits"
    );
    const total = filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    return total;
  };

  return (
    <DepositWrapped
      userbank={userbank}
      selectBank={selectBank}
      getSelectedBank={getSelectedBank}
      getTotalTransaction={getTotalTransaction} // Pass the function as a prop
      transactions={transactions}
      transactionLoading={transactionLoading}
    />
  );
}

class DepositWrapped extends Component {
  static propTypes = {
    userbank: PropTypes.array,
    selectBank: PropTypes.func,
    getSelectedBank: PropTypes.object,
    monthlyTransaction: PropTypes.array,
    getTotalTransaction: PropTypes.func,
    transactions: PropTypes.array,
    transactionLoading: PropTypes.bool,
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
      getSelectedBank,
      getTotalTransaction,
      transactions,
      transactionLoading,
    } = this.props;

    return (
      <div className="container-fluid">
        <div className="w-100">
          <div className="col-lg-12 d-flex justify-content-between mb-2">
            <div>
              <Link
                to="/dashboard/bank/deposit/new"
                className="btn btn-primary"
              >
                Create Deposit
              </Link>
            </div>
            <div>
              <DownloadButton />
            </div>
          </div>

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

          <div className="d-flex ">
            <div className="col-lg-4">
              <TotalView
                data={getSelectedBank.currentAmount}
                title="Bank Balance"
                color="dark"
                icon="fa-solid fa-building-columns"
                design="info-box"
              />
            </div>
            <div className="col-lg-4">
              <TotalView
                data={getTotalTransaction("deposit")}
                title="Total Deposits"
                color="success"
                icon="fa-solid fa-building-columns"
                design="info-box"
              />
            </div>
            <div className="col-lg-4">
              <TotalView
                data={getTotalTransaction("transfer")}
                title="Total Transactions"
                color="primary"
                icon="fa-solid fa-money-bill-trend-up"
                design="info-box"
              />
            </div>
          </div>

          <div className="row">
            {/* <div className="col-lg-6">
              <SingleBarChart name={"Deposit"} />
            </div> */}

            {/* <div className="col-lg-6">
              <SingleLineChart name={"Deposit"} />
            </div> */}
            <div className="col-12 mt-4 card">
              <h2 className="text-center">Total Deposits</h2>
              <TransactionTable
                transactions={transactions}
                type="deposit"
                title="Deposit History"
              />
            </div>
            <div className="card col-7">
              {/* <ChartComponent
                dataYearly={value.bankhistory}
                dataWeekly={value.bankhistory}
                dataDaily={value.bankhistory}
                labelYearly={value.label}
                labelWeekly={value.label}
                labelDaily={value.label}
                name={"Deposit"}
              /> */}
            </div>
            <div className="col-lg-5">
              <div className="custom-card p-3">
                <TransactionChart
                  transactions={transactions}
                  type="deposit"
                  title="Deposit Sources"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
