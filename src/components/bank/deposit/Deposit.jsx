import React, { useState, useEffect } from "react";
import DynamicTable from "../../../const/widget_component_model/table/DynamicTable";
import { generateRandomTransactions } from "../../../behindTheScene/api/bank";
import SingleBarChart from "../../../const/widget_component_model/charts/SingleBarChart";
import SingleLineChart from "../../../const/widget_component_model/charts/SingleLineChart";
import TotalView from "../TotalView";
import ChartComponent from "../Chart";
import TransactionChart from "../TransactionChart";
import DownloadButton from "../../../const/DownloadButton";
import { Link } from "react-router-dom";

function Deposit() {
  const headers = [
    { key: "account", label: "Account" },
    { key: "bank", label: "Bank" },
    { key: "type", label: "Type" },
    { key: "amount", label: "Amount" },
  ];

  const userbank = useSelector(userbankDetails);
  const [getSelectedBank, setSelectedBank] = useState(userbank[0]);
  const [transactions, setTransactions] = useState([]);

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
      (transaction) => transaction.type === type
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

class DepositWrapped extends React.Component {
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

          <div className="d-flex">
            <div className="col-lg-4">
              <TotalView
                data={getTotalTransaction("deposit")}
                title="Current Balance"
                color="info"
                icon="fa-solid fa-money-bill-trend-up"
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
                data={filterData.length}
                title="Total Transactions"
                color="primary"
                icon="fa-solid fa-money-bill-trend-up"
                design="info-box"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <SingleBarChart
                data={value.bankhistory}
                label={value.label}
                name={"Deposit"}
              />
            </div>

            <div className="col-lg-6">
              {/* <SingleLineChart
              data={value.bankhistory}
              label={value.label}
              name={"Deposit"}
            /> */}
            </div>
            <div className="col-12 mt-4 card">
              <h2 className="text-center">Total Deposits</h2>
              <DynamicTable
                data={filterData}
                headers={headers}
                pageNo="10"
                total={true}
              />
            </div>
            <div className="card col-7">
              <ChartComponent
                dataYearly={value.bankhistory}
                dataWeekly={value.bankhistory}
                dataDaily={value.bankhistory}
                labelYearly={value.label}
                labelWeekly={value.label}
                labelDaily={value.label}
                name={"Deposit"}
              />
            </div>
            <div className="col-lg-5">
              <div className="custom-card p-3">
                <TransactionChart
                  transactions={transaction}
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

export default Deposit;
