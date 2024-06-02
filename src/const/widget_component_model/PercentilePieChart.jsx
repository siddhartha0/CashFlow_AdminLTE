import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

export default class PercentilePieChart extends Component {
  static propTypes = {
    label: PropTypes.string,
    seriesValue: PropTypes.string,
    color: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { color, seriesValue } = this.props;

    this.state = {
      series: [seriesValue],
      options: {
        chart: {
          height: 10,
          type: "radialBar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "55%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#9B4078",
              strokeWidth: "90%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: 0,
                show: false,
                color: "#888",
                fontSize: "16px",
              },
              value: {
                color: "#111",
                offsetY: 6,
                fontSize: "18px",
                fontWeight: 700,
                show: true,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: [color],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        // labels: [label],
      },
    };
  }

  render() {
    return (
      <div>
        <div id="card">
          <div id="chart">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="radialBar"
              height={140}
            />
          </div>
        </div>
      </div>
    );
  }
}
