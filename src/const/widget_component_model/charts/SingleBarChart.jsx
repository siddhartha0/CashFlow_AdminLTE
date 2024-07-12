import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetTransactionByMonthQuery } from "../../../slices/api/transaction/TransactionApi";

class SingleBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "Deposit",
          data: [],
        },
      ],
      options: {
        title: {
          text: `Monthly Total Deposit`,
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
          categories: [],
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
  }

  componentDidMount() {
    const { year, bankId } = this.props;
    const {
      data: monthlyTransaction,
      error,
      isLoading,
    } = useGetTransactionByMonthQuery({ year, bankId });

    if (monthlyTransaction) {
      const months = monthlyTransaction.map((item) => {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return monthNames[item.month - 1];
      });

      const depositAmounts = monthlyTransaction.map(
        (item) => item.total_deposit_amount
      );

      this.setState({
        series: [
          {
            name: "Deposit",
            data: depositAmounts,
          },
        ],
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: months,
          },
        },
      });
    }
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;
  }
  render() {
    return (
      <div className="custom-card">
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default SingleBarChart;
