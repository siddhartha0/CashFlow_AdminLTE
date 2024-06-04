import { Component } from "react";
import Balance from "../../behindTheScene/balance/Balance";
import PropTypes from "prop-types";
import TransactionHistory from "./incomeOutgoingcomps/TransactionHistory";

export default class IncomeExpenseHistory extends Component {
  static propTypes = {
    label: PropTypes.string,
    header: PropTypes.string,
  };

  render() {
    const { label, header } = this.props;

    var bankIncomeAmount = 0;
    var bankexpenseAmount = 0;

    var walletIncomeAmount = 0;
    var walletExpenseAmount = 0;

    const localValue = JSON.parse(localStorage.getItem("dashboard"));
    const cashFlow = new Balance();

    if (header === "Bank") {
      cashFlow.calculateTotalIncoming(localValue.bankhistory);
      if (label === "income") {
        bankIncomeAmount = cashFlow.totalIncoming;
      } else {
        bankexpenseAmount = cashFlow.totalOutgoing;
      }
    } else {
      cashFlow.calculateTotalIncoming(localValue.walletHistory);
      if (label === "income") {
        walletIncomeAmount = cashFlow.totalIncoming;
      } else {
        walletExpenseAmount = cashFlow.totalOutgoing;
      }
    }

    return (
      <div className="d-flex flex-column">
        {header === "Bank" && (
          <TransactionHistory
            label={label}
            incomeAmount={bankIncomeAmount}
            expenseAmount={bankexpenseAmount}
            cashFlow={cashFlow}
          />
        )}

        {header === "Wallet" && (
          <TransactionHistory
            label={label}
            incomeAmount={walletIncomeAmount}
            expenseAmount={walletExpenseAmount}
            cashFlow={cashFlow}
          />
        )}
      </div>
    );
  }
}
