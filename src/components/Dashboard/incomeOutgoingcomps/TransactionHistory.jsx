import { Component } from "react";
import PieChartModel from "../../../const/widget_component_model/PieChartModel";
import ColorBarModel from "../../../const/widget_component_model/ColorBarModel";
import PropTypes from "prop-types";

export default class TransactionHistory extends Component {
  static propTypes = {
    label: PropTypes.string,
    incomeAmount: PropTypes.number,
    expenseAmount: PropTypes.number,
    cashFlow: PropTypes.any,
  };

  render() {
    const { label, incomeAmount, expenseAmount, cashFlow } = this.props;
    return (
      <div>
        {label === "income" && (
          <div>
            <PieChartModel source={cashFlow.mapIncomeSource(incomeAmount)} />
            <div className="d-flex flex-column ">
              {cashFlow.mapIncomeSource(incomeAmount).map((source) => (
                <div key={source.source} className="d-flex my-2">
                  <ColorBarModel
                    title={source.source}
                    totalAmount={incomeAmount}
                    actualAmount={source.amount}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {label === "expense" && (
          <div>
            <PieChartModel source={cashFlow.mapExpenseSource(expenseAmount)} />
            <div className="d-flex flex-column ">
              {cashFlow.mapExpenseSource(expenseAmount).map((source) => (
                <div key={source.source} className="d-flex my-2">
                  <ColorBarModel
                    title={source.source}
                    totalAmount={expenseAmount}
                    actualAmount={source.amount}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
