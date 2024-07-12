import React from "react";

import ReactApexChart from "react-apexcharts";

const AssetPieChart = ({ series, labels }) => {
  const options = {
    chart: {
      type: "pie",
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <ReactApexChart options={options} series={series} type="pie" width="380" />
  );
};

export default AssetPieChart;
