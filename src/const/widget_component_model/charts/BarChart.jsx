import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetTransactionByMonthQuery } from "../../../slices/api/transaction/TransactionApi";

const BarChart = ({ year, bankId }) => {
  const {
    data: monthlyTransaction,
    error,
    isLoading,
  } = useGetTransactionByMonthQuery({ year, bankId });

  const [chartData, setChartData] = useState({
    series: [
      { name: "Deposit", data: [] },
      { name: "Withdraw", data: [] },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "straight" },
      title: { text: "Balance Summary", align: "left" },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: { categories: [] },
    },
  });

  useEffect(() => {
    if (monthlyTransaction) {
      const months = monthlyTransaction.map((item) => {
        // Assuming item.month is a numeric value representing month (1 for Jan, 2 for Feb, etc.)
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
        return monthNames[item.month - 1]; // Adjust for zero-indexed array
      });

      const depositAmounts = monthlyTransaction.map(
        (item) => item.total_deposit_amount
      );
      const withdrawAmounts = monthlyTransaction.map(
        (item) => item.total_withdraw_amount
      );

      setChartData({
        series: [
          { name: "Deposit", data: depositAmounts },
          { name: "Withdraw", data: withdrawAmounts },
        ],
        options: {
          ...chartData.options,
          xaxis: { categories: months },
        },
      });
    }
  }, [monthlyTransaction]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      height={420}
    />
  );
};

export default BarChart;
