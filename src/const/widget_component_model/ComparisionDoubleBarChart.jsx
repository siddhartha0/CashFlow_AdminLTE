import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

export default class ComparisionDoubleBarChart extends Component {
  static propTypes = {
    title1: PropTypes.string,
    title2: PropTypes.string,
    data1: PropTypes.array,
    data2: PropTypes.array,
    label: PropTypes.array,
  };

  constructor(props) {
    super(props);

    const { title1, title2, data1, data2, label } = props;

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
          categories: label,
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={420}
        />
      </div>
    );
  }
}
