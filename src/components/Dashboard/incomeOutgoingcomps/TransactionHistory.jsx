import { Component } from "react";
import PieChartModel from "../../../const/widget_component_model/charts/PieChartModel";
import ColorBarModel from "../../../const/widget_component_model/charts/ColorBarModel";
import PropTypes from "prop-types";

export default class TransactionHistory extends Component {
  static propTypes = {
    label: PropTypes.string,
    incomeAmount: PropTypes.number,
    expenseAmount: PropTypes.number,
    depositHistory: PropTypes.array,
    withdrawHistory: PropTypes.array,
  };

  render() {
    const {
      label,
      incomeAmount,
      expenseAmount,
      depositHistory,
      withdrawHistory,
    } = this.props;

    return (
      <div>
        {label === "income" && (
          <div>
            {depositHistory ? (
              <PieChartModel
                source={depositHistory?.map((history) => history)}
              />
            ) : (
              <div>Empty!!!</div>
            )}

            <div className="d-flex flex-column mt-5">
              {depositHistory ? (
                depositHistory?.map((source) => (
                  <div key={source.source} className="d-flex my-2 ">
                    <ColorBarModel
                      title={source?.source ?? "others"}
                      totalAmount={incomeAmount ?? 0}
                      actualAmount={source?.amount ?? 0}
                      color="#FFCB30"
                    />
                  </div>
                ))
              ) : (
                <div>No data to render</div>
              )}
            </div>
          </div>
        )}
        {label === "expense" && (
          <div>
            {withdrawHistory ? (
              <PieChartModel
                source={withdrawHistory?.map((history) => history)}
              />
            ) : (
              <div className="text-black text-bold text-md">Empty!!!</div>
            )}

            <div className="d-flex flex-column mt-5">
              {withdrawHistory ? (
                withdrawHistory?.map((source) => (
                  <div key={source.source} className="d-flex my-2">
                    <ColorBarModel
                      title={source.source}
                      totalAmount={expenseAmount}
                      actualAmount={source.amount}
                      color="#DC3545"
                    />
                  </div>
                ))
              ) : (
                <div
                  className="text-black  text-md  "
                  style={{
                    marginTop: "-2.6rem",
                    minWidth: "15rem",
                  }}
                >
                  No data to render
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
