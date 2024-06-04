import { Component } from "react";
import Balance from "../../behindTheScene/balance/Balance";
import PropTypes from "prop-types";
import TransactionStats from "./incomeOutgoingcomps/TransactionStats";

export default class IncomeExpenseStats extends Component {
  constructor() {
    super();
  }
  static propTypes = {
    label: PropTypes.string,
  };

  render() {
    const { label } = this.props;
    const localValue = JSON.parse(localStorage.getItem("dashboard"));
    const cashFlow = new Balance();
    label === "Bank"
      ? cashFlow.calculateTotalIncoming(localValue.bankhistory, "bank")
      : cashFlow.calculateTotalIncoming(localValue.walletHistory, "wallet");

    return (
      <div className="d-flex flex-column ">
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
          />
        )}
      </div>
    );
  }
}
