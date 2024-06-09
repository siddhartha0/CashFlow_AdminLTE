import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class DynamicChart extends Component {
  constructor(props) {
    super(props);
    const { data, title, chartType } = this.props;

    this.state = {
      options: {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        title: {
          text: title,
          align: "left",
        },
        xaxis: {
          categories: data,
        },
      },
      series: [
        {
          name: "Series 1",
          data: data,
        },
        {
          name: "Series 1",
          data: data,
        },
      ],
      chartType: chartType,
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type={this.state.chartType}
          height={350}
        />
      </div>
    );
  }
}

export default DynamicChart;
