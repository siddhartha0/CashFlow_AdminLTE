import { Component } from "react";
import Balance from "../../behindTheScene/balance/Balance";
import PropTypes from "prop-types";
import TransactionHistory from "./incomeOutgoingcomps/TransactionHistory";

export default class IncomeExpenseHistory extends Component {
  static propTypes = {
    label: PropTypes.string,
    header: PropTypes.string,
    bankwithdrawHistory: PropTypes.array,
    totalDeposits: PropTypes.number,
    totalWithdraw: PropTypes.number,
    userbankDepositsData: PropTypes.object,
    userbankWithdrawData: PropTypes.object,
  };

  render() {
    const {
      label,
      header,
      totalDeposits,
      totalWithdraw,
      bankwithdrawHistory,
      userbankDepositsData,
      userbankWithdrawData,
    } = this.props;
    console.log(userbankWithdrawData);
    return (
      <div className="d-flex flex-column">
        {header?.title?.toLowerCase().includes("bank") && (
          <TransactionHistory
            label={label}
            incomeAmount={totalDeposits}
            expenseAmount={totalWithdraw}
            userbankDepositsData={userbankDepositsData}
            userbankWithdrawData={userbankWithdrawData}
            withdrawHistory={bankwithdrawHistory?.entities}
          />
        )}

        {/* TODO: */}
        {header === "Wallet" && (
          <TransactionHistory
            label={label}
            incomeAmount={totalDeposits}
            expenseAmount={totalWithdraw}
          />
        )}
      </div>
    );
  }
}
