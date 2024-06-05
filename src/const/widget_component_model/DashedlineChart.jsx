import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

export default class DashedLineChart extends Component {
  static propTypes = {
    label1: PropTypes.string,
    data1: PropTypes.array,

    label2: PropTypes.string,
    data2: PropTypes.array,
  };

  constructor(props) {
    super(props);
    const { label1, label2, data1, data2 } = this.props;

    this.state = {
      series: [
        {
          name: label1,
          data: data1,
        },

        {
          name: label2,
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
          width: [5, 5, 5],
          curve: "straight",
          dashArray: [10, 5, 5],
        },

        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - <strong>" +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              "</strong>"
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: data1?.length + data2?.length,
        },
        tooltip: {
          y: [
            // {
            //   title: {
            //     formatter: function (val) {
            //       return val + " (mins)";
            //     },
            //   },
            // },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
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
            height={320}
            width={650}
          />
        </div>
        {/* <div id="html-dist"></div> */}
      </div>
    );
  }
}
