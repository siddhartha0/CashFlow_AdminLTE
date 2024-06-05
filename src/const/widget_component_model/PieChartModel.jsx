import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
export default class PieChartModel extends Component {
  static propTypes = {
    source: PropTypes.any,
  };
  constructor(props) {
    super(props);
    const { source } = props;

    this.state = {
      series: source.map((s) => s.amount),
      options: {
        chart: {
          width: 150,
          type: "pie",
        },
        labels: source.map((source) => source.source),
        responsive: [
          {
            breakpoint: 0,
            options: {
              chart: {
                width: 0,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
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
            type="pie"
            width={320}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
