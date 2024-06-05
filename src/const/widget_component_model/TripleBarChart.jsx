import { Component } from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";

export default class TripleBarChart extends Component {
  static propTypes = {
    title1: PropTypes.string,
    title2: PropTypes.string,
    title3: PropTypes.string,
    data1: PropTypes.array,
    data2: PropTypes.array,
    data3: PropTypes.array,
    label: PropTypes.array,
    dataColors: PropTypes.array,
  };
  constructor(props) {
    super(props);

    const { title1, title2, title3, data1, data2, data3, label, dataColors } =
      props;
    this.state = {
      series: [
        {
          name: title1,
          data: data1,
        },
        {
          name: title2,
          data: data2,
        },
        {
          name: title3,
          data: data3,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          row: {
            colors: ["transparent"],
          },
          column: {
            colors: ["transparent"],
          },
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: label,
        },
        colors: dataColors,

        fill: {
          // colors: ["#F44336", "#E91E63", "#9C27B0"],
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
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
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
