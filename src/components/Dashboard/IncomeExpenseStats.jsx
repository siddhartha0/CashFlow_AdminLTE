import { Component } from "react";
import PropTypes from "prop-types";
import TransactionStats from "./incomeOutgoingcomps/TransactionStats";
import PickColors from "../../const/PickColors";

export default class IncomeExpenseStats extends Component {
  constructor() {
    super();
  }
  static propTypes = {
    label: PropTypes.string,
    currentMonth: PropTypes.string,
    overAllSelected: PropTypes.bool,
    totalDeposits: PropTypes.number,
    totalWithdraw: PropTypes.number,
    overAllTransactionData: PropTypes.array,
  };

  render() {
    const { label, totalDeposits, totalWithdraw, overAllTransactionData } =
      this.props;

    const localValue = JSON.parse(localStorage.getItem("dashboard"));

    // console.log(oneMonthExpense);
    const bankColors = new PickColors()
      .income_Expense_Dashboard_BANK_Data_Colors;
    const walletColors = new PickColors()
      .income_Expense_Dashboard_WALLET_Data_Colors;

    return (
      <div className="d-flex flex-column  ">
        <div>
          <p className="text-lg text-uppercase">Income & expense</p>
        </div>

        {label === "Bank" && (
          <TransactionStats
            label={label}
            totalDeposits={totalDeposits ?? 0}
            totalWithdraw={totalWithdraw ?? 0}
            history={localValue.bankhistory}
            colors={bankColors}
            overAllTransactionData={overAllTransactionData}
          />
        )}

        {/* TODO:: */}
        {label === "Wallet" && (
          <TransactionStats
            label={label}
            history={localValue.walletHistory}
            colors={walletColors}
          />
        )}
      </div>
    );
  }
}
