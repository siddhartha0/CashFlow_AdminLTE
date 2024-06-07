import { Component } from "react";
import StatsComps from "./StatsComps";
import SmallLineChart from "../../../const/widget_component_model/charts/SmallLineChart";
import PropTypes from "prop-types";
import TripleBarChart from "../../../const/widget_component_model/charts/TripleBarChart";

export default class TransactionStats extends Component {
  static propTypes = {
    label: PropTypes.string,
    incomeAmount: PropTypes.number,
    expenseAmount: PropTypes.number,
    total_Income_Amount: PropTypes.array,
    total_expense_Amount: PropTypes.array,
    history: PropTypes.array,
    colors: PropTypes.array,
  };
  render() {
    const {
      label,
      incomeAmount,
      expenseAmount,
      total_Income_Amount,
      total_expense_Amount,
      history,
      colors,
    } = this.props;
    const value = JSON.parse(localStorage.getItem("dashboard"));

    return (
      <div className="d-flex flex-column">
        <div className="d-flex  justify-content-between">
          <div>
            <StatsComps
              title="Total Incoming "
              amount={incomeAmount}
              color="#FFCB30"
            >
              <SmallLineChart
                data={total_Income_Amount}
                label={label}
                color="#FFCB30"
              />
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
            <StatsComps
              title="Total Expense "
              color="#DC3545"
              amount={expenseAmount}
            >
              <SmallLineChart
                data={total_expense_Amount}
                label={label}
                color="#DC3545"
              />
            </StatsComps>
          </div>
        </div>
        <div>
          <TripleBarChart
            title1="Income"
            data1={total_Income_Amount}
            title2="Expense"
            data2={total_expense_Amount}
            title3="Current Balance"
            data3={history}
            label={value.label}
            dataColors={colors}
          />
        </div>
      </div>
    );
  }
}
