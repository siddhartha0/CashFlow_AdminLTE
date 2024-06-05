import { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class SingleLineChart extends Component {
  constructor(props) {
    super(props);
    const { data, label, name } = this.props;

    // Ensure data array has 30 entries
    const paddedData = this.padData(data, 30);

    this.state = {
      series: [
        {
          name: `${name}`,
          data: paddedData,
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
          text: `${name} by Day`,
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: Array.from({ length: 30 }, (_, i) => i + 1),
        },
      },
    };
  }

  padData(data, length) {
    return Array.from({ length }, (_, i) =>
      data[i] !== undefined ? data[i] : null
    );
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
