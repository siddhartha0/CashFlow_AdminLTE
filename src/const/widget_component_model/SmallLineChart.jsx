import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

export default class SmallLineChart extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.any),
    label: PropTypes.string,
  };

  constructor(props) {
    super();
    const { data, label } = props;

    this.state = {
      series5: [
        {
          data: data,
        },
      ],
      options5: {
        chart: {
          type: "area",
          width: 100,
          height: 10,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
          },
        },
        // labels: [1, 2],
        xaxis: {
          crosshairs: {
            width: 1,
          },
        },
        tooltip: {
          fixed: {
            enabled: true,
          },
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function () {
                return label;
              },
            },
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
          series={this.state?.series5}
          type="area"
          height={35}
          width={100}
        />
      </div>
    );
  }
}
