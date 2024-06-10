import { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class Deposit extends Component {
  constructor() {
    super();
    this.value = JSON.parse(localStorage.getItem("dashboard"));

    this.state = {
      series: [
        {
          name: "Deposit",
          data: this.value.bankhistory,
        },
        {
          name: "Withdraw",
          data: this.value.walletHistory,
        },
      ],

      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Balance Summary",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: this.value.label,
        },
      },
    };
  }
  render() {
    return (
      <div className="col-lg-9">
        <div className="card p-3">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={420}
          />
        </div>
      </div>
    );
  }
}
