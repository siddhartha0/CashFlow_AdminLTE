import { Component } from "react";
import StatsComps from "./StatsComps";
import SmallLineChart from "../../../const/widget_component_model/SmallLineChart";
import DashedLineChart from "../../../const/widget_component_model/DashedlineChart";
import PropTypes from "prop-types";

export default class TransactionStats extends Component {
  static propTypes = {
    label: PropTypes.string,
    incomeAmount: PropTypes.number,
    expenseAmount: PropTypes.number,
    total_Income_Amount: PropTypes.array,
    total_expense_Amount: PropTypes.array,
  };
  render() {
    const {
      label,

      incomeAmount,
      expenseAmount,
      total_Income_Amount,
      total_expense_Amount,
    } = this.props;
    return (
      <div className="d-flex flex-column">
        <div className="d-flex  justify-content-between">
          <div>
            <StatsComps title="Total Incoming " amount={incomeAmount}>
              <SmallLineChart data={total_Income_Amount} label={label} />
            </StatsComps>
          </div>

          <hr
            className="text-dark text-opacity-50"
            style={{
              width: ".5px",
              height: "60px",
              marginTop: "-5px",
              background: "#DDDFE1",
            }}
          />

          <div>
            <StatsComps title="Total Expense " amount={expenseAmount}>
              <SmallLineChart data={total_expense_Amount} label={label} />
            </StatsComps>
          </div>
        </div>
        <div>
          <DashedLineChart
            label1="Income"
            data1={total_Income_Amount}
            label2="Expense"
            data2={total_expense_Amount}
          />
        </div>
      </div>
    );
  }
}
