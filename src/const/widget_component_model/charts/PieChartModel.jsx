import ReactApexChart from "react-apexcharts";

export default function PieChartModel(source) {
  const init_State = {
    series: source?.source?.map((s) => s.amount),
    options: {
      chart: {
        width: 10,
        type: "pie",
      },
      legend: {
        show: true,
        position: "bottom",
      },
      labels: source?.source?.map((source) => source.source),
      responsive: [
        {
          breakpoint: 10,
          options: {
            chart: {
              width: 0,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <div
        id="chart"
        style={{
          marginLeft: "-30px",
        }}
      >
        <ReactApexChart
          options={init_State.options}
          series={init_State.series}
          type="pie"
          width={300}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
