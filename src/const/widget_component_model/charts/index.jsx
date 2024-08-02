import ReactApexChart from "react-apexcharts";

const ReactChart = ({ options, series, chartType, height }) => {
  return (
    <div className="">
      <ReactApexChart
        options={options}
        series={series}
        type={chartType}
        height={height}
      />
    </div>
  );
};
export default ReactChart;


