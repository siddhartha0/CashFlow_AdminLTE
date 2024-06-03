import { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class SmallLineChart extends Component {
  constructor() {
    super();
    this.state = {
      series5: [
        {
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
        },
      ],
      options5: {
        chart: {
          type: "bar",
          width: 100,
          height: 35,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
          },
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          crosshairs: {
            width: 1,
          },
        },
        tooltip: {
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          y: {
            // title: {
            //   formatter: function (seriesName) {
            //     return "";
            //   },
            // },
          },
          marker: {
            show: false,
          },
        },
      },
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options5}
          series={this.state.series5}
          type="area"
          height={35}
          width={100}
        />
      </div>
    );
  }
}
