import { Component } from "react";
import StatsComps from "./StatsComps";
import SmallLineChart from "../../../const/widget_component_model/charts/SmallLineChart";
import PropTypes from "prop-types";
import TripleBarChart from "../../../const/widget_component_model/charts/TripleBarChart";

export default class TransactionStats extends Component {
  static propTypes = {
    label: PropTypes.string,
    history: PropTypes.array,
    colors: PropTypes.array,
    totalDeposits: PropTypes.number,
    totalWithdraw: PropTypes.number,
    overAllTransactionData: PropTypes.array,
  };
  render() {
    const {
      label,
      totalDeposits,
      totalWithdraw,
      history,
      colors,
      overAllTransactionData,
    } = this.props;
    const value = JSON.parse(localStorage.getItem("dashboard"));

    return (
      <div className="d-flex flex-column">
        <div className="d-flex  justify-content-between">
          <div>
            <StatsComps
              title="Total Incoming "
              amount={totalDeposits}
              color="#FFCB30"
            >
              <SmallLineChart
                data={
                  overAllTransactionData
                    ? overAllTransactionData?.map(
                        (transaction) => transaction.total_deposit_amount
                      )
                    : []
                }
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
              amount={totalWithdraw}
            >
              <SmallLineChart
                data={
                  overAllTransactionData
                    ? overAllTransactionData?.map(
                        (transaction) => transaction.total_withdraw_amount
                      )
                    : []
                }
                label={label}
                color="#DC3545"
              />
            </StatsComps>
          </div>
        </div>
        <div>
          <TripleBarChart
            title1="Income"
            data1={
              overAllTransactionData
                ? overAllTransactionData?.map(
                    (transaction) => transaction.total_deposit_amount
                  )
                : []
            }
            title2="Expense"
            data2={
              overAllTransactionData
                ? overAllTransactionData?.map(
                    (transaction) => transaction.total_withdraw_amount
                  )
                : []
            }
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
