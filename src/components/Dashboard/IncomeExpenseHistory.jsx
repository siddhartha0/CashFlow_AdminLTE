import { Component } from "react";
import PropTypes from "prop-types";
import TransactionHistory from "./incomeOutgoingcomps/TransactionHistory";

export default class IncomeExpenseHistory extends Component {
  static propTypes = {
    header: PropTypes.string,
    initData: PropTypes.object,
  };

  render() {
    const { header, initData } = this.props;
    return (
      <div className="d-flex flex-column">
        {header?.title?.toLowerCase().includes("bank") && (
          <TransactionHistory initData={initData} />
        )}

        {/* TODO: */}
        {header === "Wallet" && <TransactionHistory />}
      </div>
    );
  }
}
