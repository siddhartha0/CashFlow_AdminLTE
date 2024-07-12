import { Component } from "react";
import Balance from "../../behindTheScene/balance/Balance";
import PropTypes from "prop-types";
import TransactionHistory from "./incomeOutgoingcomps/TransactionHistory";

export default class IncomeExpenseHistory extends Component {
  static propTypes = {
    label: PropTypes.string,
    header: PropTypes.string,
    bankdepositHistory: PropTypes.array,
    bankdepositLoading: PropTypes.bool,
    bankwithdrawHistory: PropTypes.array,
    bankwithdrawLoading: PropTypes.array,
  };

  render() {
    const {
      label,
      header,
      totalDeposits,
      totalWithdraw,
      bankdepositHistory,
      bankdepositLoading,
      bankwithdrawHistory,
      bankwithdrawLoading,
    } = this.props;

    var bankIncomeAmount = 0;
    var bankexpenseAmount = 0;

    var walletIncomeAmount = 0;
    var walletExpenseAmount = 0;

    if (header?.title?.toLowerCase().includes("bank")) {
      if (label === "income") {
        const totalAmount = bankdepositHistory?.entities?.map(
          (entity) => entity.amount
        );
        if (totalAmount) {
          const sumofAmount = totalAmount.reduce((a, b) => a + b);
          bankIncomeAmount = sumofAmount;
        }
      } else {
        const totalAmount = bankwithdrawHistory?.entities?.map(
          (entity) => entity.amount
        );
        if (totalAmount) {
          const sumofAmount = totalAmount.reduce((a, b) => a + b);
          bankexpenseAmount = sumofAmount;
        }
      }
    } else {
      if (label === "income") {
        walletIncomeAmount = totalDeposits;
      } else {
        walletExpenseAmount = totalWithdraw;
      }
    }

    return (
      <div className="d-flex flex-column">
        {header?.title?.toLowerCase().includes("bank") && (
          <TransactionHistory
            label={label}
            incomeAmount={bankIncomeAmount}
            expenseAmount={bankexpenseAmount}
            depositHistory={bankdepositHistory?.entities}
            withdrawHistory={bankwithdrawHistory?.entities}
          />
        )}

        {header === "Wallet" && (
          <TransactionHistory
            label={label}
            incomeAmount={walletIncomeAmount}
            expenseAmount={walletExpenseAmount}
          />
        )}
      </div>
    );
  }
}
