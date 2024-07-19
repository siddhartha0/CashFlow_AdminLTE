import ReactApexChart from "react-apexcharts";

const SmallLineChart = ({ data, label, color }) => {
  const intit_state = {
    series5: [
      {
        data: data,
        color: color,
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

  return (
    <div>
      <ReactApexChart
        options={intit_state.options5}
        series={intit_state?.series5}
        type="area"
        height={35}
        width={100}
      />
    </div>
  );
};

export default SmallLineChart;
