import { Component } from "react";
import StatsComps from "./incomeOutgoingcomps/StatsComps";
import SmallLineChart from "../../const/widget_component_model/SmallLineChart";
import Balance from "../../behindTheScene/balance/Balance";
import PropTypes from "prop-types";

export default class IncomeOutgoing extends Component {
  constructor() {
    super();
  }
  static propTypes = {
    label: PropTypes.string,
  };

  render() {
    const { label } = this.props;
    const localValue = JSON.parse(localStorage.getItem("dashboard"));
    const cashFlow = new Balance();
    label === "Bank"
      ? cashFlow.calculateTotalIncoming(localValue.bankhistory)
      : cashFlow.calculateTotalIncoming(localValue.walletHistory);

    return (
      <div className="d-flex flex-column ">
        <div>
          <p className="text-lg text-uppercase">Income & expense</p>
        </div>
        <div className="d-flex  justify-content-between">
          <div>
            <StatsComps title="Total Incoming " amount={cashFlow.totalIncoming}>
              <SmallLineChart />
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
            <StatsComps title="Total Spending " amount={cashFlow.totalOutgoing}>
              <SmallLineChart />
            </StatsComps>
          </div>
        </div>
      </div>
    );
  }
}
