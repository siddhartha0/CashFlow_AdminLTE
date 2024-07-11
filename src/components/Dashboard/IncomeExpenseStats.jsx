import { Component } from "react";
import Balance from "../../behindTheScene/balance/Balance";
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
  };

  render() {
    const {
      label,
      bankOneMonthHistory,
      overAllSelected,
      walletOneMonthHistory,
    } = this.props;

    const localValue = JSON.parse(localStorage.getItem("dashboard"));

    const cashFlow = new Balance();
    label === "Bank"
      ? cashFlow.calculate_Income_Expense(localValue.bankhistory, "bank")
      : cashFlow.calculate_Income_Expense(localValue.walletHistory, "wallet");

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
            cashFlow={cashFlow}
            incomeAmount={cashFlow.totalIncoming}
            expenseAmount={cashFlow.totalOutgoing}
            total_Income_Amount={cashFlow.total_bank_Incoming_Amount}
            total_expense_Amount={cashFlow.total_bank_Spent_Amount}
            history={localValue.bankhistory}
            colors={bankColors}
          />
        )}

        {label === "Wallet" && (
          <TransactionStats
            label={label}
            cashFlow={cashFlow}
            incomeAmount={cashFlow.totalIncoming}
            expenseAmount={cashFlow.totalOutgoing}
            total_Income_Amount={cashFlow.total_wallet_Incoming_Amount}
            total_expense_Amount={cashFlow.total_wallet_Spent_Amount}
            history={localValue.walletHistory}
            colors={walletColors}
          />
        )}
      </div>
    );
  }
}
