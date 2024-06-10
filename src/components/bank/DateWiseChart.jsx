import React, { useState } from "react";
import Chart from "react-apexcharts";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";

// Sample transaction data
const transactions = generateRandomTransactions(100);

// Helper function to group transactions by key (year, month, day)
function groupBy(transactions, keyFn) {
  return transactions.reduce((result, transaction) => {
    const key = keyFn(transaction);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(transaction);
    return result;
  }, {});
}

// Helper function to get month name
function getMonthName(monthIndex) {
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
  return monthNames[monthIndex];
}

// Helper function to get day of the week name
function getDayName(dayIndex) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayNames[dayIndex];
}

// Helper function to get week number
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

const DateWiseChart = () => {
  const [chartType, setChartType] = useState("monthly");

  // Group transactions by month
  const transactionsByMonth = groupBy(transactions, (transaction) => {
    const date = new Date(transaction.date);
    return `${date.getFullYear()}-${getMonthName(date.getMonth())}`;
  });

  // Prepare data for monthly chart
  const monthlySeries = Object.entries(transactionsByMonth).map(
    ([month, transactions]) => {
      return {
        x: month,
        y: transactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        ),
      };
    }
  );

  // Group transactions by day of the week within each week
  const transactionsByWeekDay = groupBy(transactions, (transaction) => {
    const date = new Date(transaction.date);
    const week = getWeekNumber(date);
    const day = getDayName(date.getDay());
    return `${date.getFullYear()}-W${week}-${day}`;
  });

  // Prepare data for weekly chart
  const weeklySeries = Object.entries(transactionsByWeekDay).map(
    ([weekDay, transactions]) => {
      return {
        x: weekDay,
        y: transactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        ),
      };
    }
  );

  // Group transactions by day
  const transactionsByDay = groupBy(
    transactions,
    (transaction) => transaction.date
  );

  // Prepare data for daily chart
  const dailySeries = Object.entries(transactionsByDay).map(
    ([day, transactions]) => {
      return {
        x: day,
        y: transactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        ),
      };
    }
  );

  const chartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      type: "category",
      title: {
        text:
          chartType === "monthly"
            ? "Month"
            : chartType === "weekly"
            ? "Week-Day"
            : "Day",
      },
    },
    yaxis: {
      title: {
        text: "Total Amount",
      },
    },
    title: {
      text:
        chartType.charAt(0).toUpperCase() +
        chartType.slice(1) +
        " Transactions",
    },
  };

  const chartSeries = [
    {
      name: "Amount",
      data:
        chartType === "monthly"
          ? monthlySeries
          : chartType === "weekly"
          ? weeklySeries
          : dailySeries,
    },
  ];

  return (
    <div>
      <h1>Transaction Charts</h1>
      <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="daily">Daily</option>
      </select>

      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default DateWiseChart;
