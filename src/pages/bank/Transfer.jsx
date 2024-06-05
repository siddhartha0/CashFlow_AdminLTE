import React, { Component } from "react";
import TransactionTable from "../../components/bank/TransactionTable";
import { transactions } from "../../behindTheScene/api/bank";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

class Transfer extends Component {
  constructor() {
    super();
    this.state = {
      totalDeposit: 0,
      totalWithdraw: 0,
      totalTransfer: 0,
      series: [],
      options: {
        chart: {
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
          text: "Transfer Amount of the Month",
          align: "left",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return "R" + value.toLocaleString();
            },
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
      },
    };
  }

  componentDidMount() {
    this.calculateTotals();
    this.prepareChartData();
  }

  calculateTotals = () => {
    let totalDeposit = 0;
    let totalWithdraw = 0;
    let totalTransfer = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "deposit") {
        totalDeposit += transaction.amount;
      } else if (transaction.type === "withdraw") {
        totalWithdraw += transaction.amount;
      } else if (transaction.type === "transfer") {
        totalTransfer += transaction.amount;
      }
    });

    this.setState({ totalDeposit, totalWithdraw, totalTransfer });
  };

  prepareChartData = () => {
    const groupedTransactions = transactions.reduce((acc, transaction) => {
      const date = moment(transaction.date).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = { deposit: 0, withdraw: 0, transfer: 0 };
      }
      if (transaction.type === "deposit") {
        acc[date].deposit += transaction.amount;
      } else if (transaction.type === "withdraw") {
        acc[date].withdraw += transaction.amount;
      } else if (transaction.type === "transfer") {
        acc[date].transfer += transaction.amount;
      }
      return acc;
    }, {});

    const categories = Object.keys(groupedTransactions);
    const series = [
      {
        name: "Total Deposit",
        data: categories.map((date) => groupedTransactions[date].deposit),
      },
      {
        name: "Total Withdraw",
        data: categories.map((date) => groupedTransactions[date].withdraw),
      },
      {
        name: "Total Transfer",
        data: categories.map((date) => groupedTransactions[date].transfer),
      },
    ];

    this.setState({ series, options: { ...this.state.options, xaxis: { categories } } });
  };

  render() {
    const { totalDeposit, totalWithdraw, totalTransfer, series, options } = this.state;

    return (
      <div className="row">
        <div className="col-lg-3">
          <div className="info-box mb-3 bg-dark">
            <span className="info-box-icon">
              <i className="fas fa-university"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Bank Balance</span>
              <span className="info-box-number">${totalDeposit - totalWithdraw}</span>
            </div>
          </div>

          <div className="info-box mb-3 bg-success">
            <span className="info-box-icon">
              <i className="fas fa-arrow-circle-up"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Total Deposit</span>
              <span className="info-box-number">${totalDeposit}</span>
            </div>
          </div>

          <div className="info-box mb-3 bg-danger">
            <span className="info-box-icon">
              <i className="fas fa-arrow-circle-down"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Total Withdraw</span>
              <span className="info-box-number">${totalWithdraw}</span>
            </div>
          </div>

          <div className="info-box mb-3 bg-info">
            <span className="info-box-icon">
              <i className="fas fa-exchange-alt"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Total Transfer</span>
              <span className="info-box-number">${totalTransfer}</span>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="card">
            <div className="card-body">
              <ReactApexChart options={options} series={series} type="line" height={350} />
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="col-lg-12 mt-4">
          <div className="card">
            <div className="card-body">
              <ReactApexChart
                options={{
                  chart: {
                    type: "heatmap",
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  colors: ["#008FFB"],
                  title: {
                    text: "Transfer Amount of the Month",
                    align: "left",
                  },
                  xaxis: {
                    type: "category",
                  },
                }}
                series={[
                  {
                    name: "Transfer Amount",
                    data: [
                      { x: "Jan", y: 10 },
                      { x: "Feb", y: 15 },
                      { x: "Mar", y: 8 },
                      { x: "Apr", y: 25 },
                      { x: "May", y: 30 },
                      { x: "Jun", y: 28 },
                      { x: "Jul", y: 21 },
                      { x: "Aug", y: 18 },
                      { x: "Sep", y: 32 },
                      { x: "Oct", y: 35 },
                      { x: "Nov", y: 20 },
                      { x: "Dec", y: 15 },
                    ],
                  },
                ]}
                type="heatmap"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transfer;
