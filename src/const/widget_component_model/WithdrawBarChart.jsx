import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class WithdrawBarChart extends Component {
  constructor() {
    super();
    this.value = JSON.parse(localStorage.getItem("dashboard"));

    this.state = {
      series: [
        // {
        //   name: "Deposit",
        //   data: this.value.bankhistory,
        // },
        {
          name: "Withdraw",
          data: this.value.bankhistory,
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
          text: "Withdraw on Monthly Basis",
          align: "center",
          style: {
            fontSize: "25px",
          },
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
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={420}
      />
    );
  }
}
