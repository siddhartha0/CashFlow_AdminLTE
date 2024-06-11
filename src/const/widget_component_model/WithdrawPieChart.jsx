import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class WithdrawPieChart extends Component {
  // constructor() {
  //   super();
  //   this.value = JSON.parse(localStorage.getItem("dashboard"));

  //   this.state = {
  //     series: [
  //       // {
  //       //   name: "Deposit",
  //       //   data: this.value.bankhistory,
  //       // },
  //       {
  //         name: "Withdraw",
  //         data: this.value.walletHistory,
  //       },
  //     ],

  //     options: {
  //       title: {
  //         text: "Withdraw on Monthly Basis",
  //         align: "center",
  //         style: {
  //           fontSize: "25px",
  //         },
  //       },
  //       grid: {
  //         row: {
  //           colors: ["#f3f3f3", "transparent"],
  //           opacity: 0.5,
  //         },
  //       },
  //       xaxis: {
  //         categories: this.value.label,
  //       },
  //     },
  //   };
  // }
  render() {
    return (
      <div>
        <ReactApexChart
          type="pie"
          height={420}
          series={[23, 43, 50, 54, 65]}
          options={{
            labels: ["Rent", "Groceries", "Clothes", "Borrow", "Misc"],
            title: {
              text: "Withdraw on Monthly Basis",
              align: "center",
              style: {
                fontSize: "25px",
              },
            },
            noData: { text: "Empty Data" },
            // options={this.state.options}
            // series={this.state.series}
            // type="bar"
            // height={420}
          }}
        />
      </div>
    );
  }
}
