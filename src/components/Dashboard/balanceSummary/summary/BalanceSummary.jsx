import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import MonthSelection from "../header/MonthSelection";
import PropTypes from "prop-types";
import LineChartProps from "./LineChartProps";

export default class BalanceSummary extends Component {
  value = {};

  static propTypes = {
    selectMonth: PropTypes.func,
    currentId: PropTypes.number,
    overAllSelected: PropTypes.bool,
    bankEachDaysAmount: PropTypes.array,
    walletEachDayAmount: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.value = JSON.parse(localStorage.getItem("dashboard"));
  }

  render() {
    const {
      selectMonth,
      currentId,
      overAllSelected,
      bankEachDaysAmount,
      walletEachDayAmount,
    } = this.props;
    const lineChartProps = new LineChartProps();

    const dayslabel = this.props.bankEachDaysAmount.map((mapper, i) => i + 1);

    return (
      <div>
        <div
          className="d-flex position-absolute"
          style={{ top: "1px", right: " 37px", zIndex: "1" }}
        >
          <MonthSelection
            months={this.value.label}
            selectMonth={selectMonth}
            currentId={currentId}
          />
        </div>
        <div id="chart" className="w-100">
          <ReactApexChart
            options={lineChartProps.optionGen(overAllSelected, dayslabel)}
            series={lineChartProps.dataGen(
              overAllSelected,
              bankEachDaysAmount,
              walletEachDayAmount
            )}
            type="line"
            height={333}
            width={520}
          />
        </div>
        <div className="d-flex ">
          <MonthSelection
            months={this.value.label}
            selectMonth={selectMonth}
            currentId={currentId}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
