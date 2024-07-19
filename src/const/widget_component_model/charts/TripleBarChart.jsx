import ReactApexChart from "react-apexcharts";

const TripleBarChart = ({
  title1,
  title2,
  title3,
  data1,
  data2,
  data3,
  label,
  dataColors,
}) => {
  const initState = {
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

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={initState.options}
          series={initState.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
export default TripleBarChart;
