import { Component } from "react";
import PieChartModel from "../../../const/widget_component_model/charts/PieChartModel";
import ColorBarModel from "../../../const/widget_component_model/charts/ColorBarModel";
import PropTypes from "prop-types";

export default class TransactionHistory extends Component {
  static propTypes = {
    label: PropTypes.string,
    incomeAmount: PropTypes.number,
    expenseAmount: PropTypes.number,
    withdrawHistory: PropTypes.array,
    userbankDepositsData: PropTypes.object,
  };

  render() {
    const {
      label,
      incomeAmount,
      expenseAmount,
      withdrawHistory,
      userbankDepositsData,
    } = this.props;

    const depositsSource = userbankDepositsData
      ? Object.keys(userbankDepositsData)
      : [];
    const depositsAmount = userbankDepositsData
      ? Object.values(userbankDepositsData)
      : [];

    return (
      <div>
        {label === "income" && (
          <div>
            {userbankDepositsData ? (
              <PieChartModel source={depositsSource} amount={depositsAmount} />
            ) : (
              <div>Empty!!!</div>
            )}

            <div className="d-flex flex-column mt-5">
              {depositsSource ? (
                depositsSource?.map((source, i) => (
                  <div key={source + i} className="d-flex my-2 ">
                    <ColorBarModel
                      title={source ?? "others"}
                      totalAmount={incomeAmount ?? 0}
                      actualAmount={depositsAmount[i] ?? 0}
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
                withdrawHistory?.map((source, i) => (
                  <div key={source.source + i} className="d-flex my-2">
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
