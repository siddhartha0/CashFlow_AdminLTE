import { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class BalanceSummary extends Component {
  value = {};

  constructor(props) {
    super(props);

    this.value = JSON.parse(localStorage.getItem("dashboard"));

    this.state = {
      series: [
        {
          name: "Bank",
          data: this.value.bankhistory,
        },
        {
          name: "Wallet",
          data: this.value.walletHistory,
        },
      ],

      options: {
        chart: {
          events: {
            events: {
              events: {
                // click: function (event, chartContext, config) {
                //   console.log(event);
                // },
                dataPointSelection: function (event, chartContext, config) {
                  console.log(config.w.config.series[config.dataPointIndex]);
                  console.log(config.w.config.labels[config.dataPointIndex]);
                },
              },
            },
          },
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
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
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
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={420}
            // onClick={(data) => {
            //   console.log(data);
            // }}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
