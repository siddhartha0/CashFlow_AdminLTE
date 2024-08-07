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
      title: { text: `Balance Summary of ${year}`, align: "left" },
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
      const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-indexed month, so +1 to match 1-12

      // Filter transactions up to the current month
      const filteredTransaction = monthlyTransaction.filter(
        (item) => item.month <= currentMonth
      );

      const months = filteredTransaction.map((item) => {
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

      const depositAmounts = filteredTransaction.map(
        (item) => item.total_deposit_amount
      );
      const withdrawAmounts = filteredTransaction.map(
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
  }, [chartData.options, monthlyTransaction]);

  if (isLoading) return <p>Loading...</p>;
  if (!monthlyTransaction) return <p>No Data were Found !!</p>;

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
