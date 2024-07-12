import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ChartComponent extends Component {
  constructor(props) {
    super(props);
    const {
      dataYearly,
      dataWeekly,
      dataDaily,
      labelYearly,
      labelWeekly,
      labelDaily,
      name,
    } = this.props;
    const paddedData = this.padData(dataDaily, 30);

    this.state = {
      selectedPeriod: "yearly",
      dataYearly,
      dataWeekly,
      dataDaily,
      labelYearly,
      labelWeekly,
      labelDaily,
      name,
      paddedData,
    };
  }

  padData(data, length) {
    const paddedArray = [];
    for (let i = 0; i < length; i++) {
      paddedArray.push(data[i] !== undefined ? data[i] : null);
    }
    return paddedArray;
  }

  handlePeriodChange = (event) => {
    this.setState({ selectedPeriod: event.target.value });
  };

  render() {
    const {
      selectedPeriod,
      dataYearly,
      dataWeekly,
      dataDaily,
      labelYearly,
      labelWeekly,
      labelDaily,
      name,
      paddedData,
    } = this.state;

    const yearlyData = {
      series: [
        {
          name: name,
          data: dataYearly,
        },
      ],
      options: {
        title: {
          text: `Monthly Total ${name}`,
          floating: true,
          align: "left",
          style: {
            color: "#444",
          },
        },
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        xaxis: {
          categories: labelYearly,
          position: "bottom",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val;
            },
          },
        },
      },
    };

    const weeklyData = {
      series: [
        {
          name: name,
          data: dataWeekly,
        },
      ],
      options: {
        title: {
          text: `Weekly Total ${name}`,
          floating: true,
          align: "left",
          style: {
            color: "#444",
          },
        },
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        xaxis: {
          categories: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          position: "bottom",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val;
            },
          },
        },
      },
    };

    const dailyData = {
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

    let chartData;
    if (selectedPeriod === "yearly") {
      chartData = yearlyData;
    } else if (selectedPeriod === "weekly") {
      chartData = weeklyData;
    } else if (selectedPeriod === "daily") {
      chartData = dailyData;
    }

    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-12">
            <label htmlFor="periodSelect" className="form-label">
              Select Period
            </label>
            <select
              id="periodSelect"
              className="form-select"
              value={selectedPeriod}
              onChange={this.handlePeriodChange}
            >
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type={chartData.options.chart.type}
              height={350}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartComponent;
