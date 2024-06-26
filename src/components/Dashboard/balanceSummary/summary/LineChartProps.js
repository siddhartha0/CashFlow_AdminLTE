export default class LineChartProps {
  value = {};

  constructor() {
    this.value = JSON.parse(localStorage.getItem("dashboard"));
  }

  dataGen(overallSelected, bankEachDayAmount, walletEachDayAmount) {
    const series = [
      {
        name: "Bank",
        data: overallSelected ? this.value.bankhistory : bankEachDayAmount,
      },
      {
        name: "Wallet",
        data: overallSelected ? this.value.walletHistory : walletEachDayAmount,
      },
    ];
    return series;
  }

  optionGen(overallSelected, label) {
    const options = {
      chart: {
        events: {
          events: {
            events: {
              dataPointSelection: function (event, chartContext, config) {
                console.log(config.w.config.series[config.dataPointIndex]);
                console.log(config.w.config.labels[config.dataPointIndex]);
              },
            },
          },
        },
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
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: overallSelected ? this.value.label : label,
      },
    };
    return options;
  }
}
