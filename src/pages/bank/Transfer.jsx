import React, { Component } from "react";
import { Link } from "react-router-dom";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

class Transfer extends Component {
  constructor() {
    super();
    this.state = {
      totalDeposit: 0,
      totalWithdraw: 0,
      totalTransfer: 0,
      transactions: generateRandomTransactions(20),
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
              return "रू" + value.toLocaleString();
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

    this.state.transactions.forEach((transaction) => {
      if (transaction.status === "deposit") {
        totalDeposit += transaction.amount;
      } else if (transaction.status === "withdraw") {
        totalWithdraw += transaction.amount;
      } else if (transaction.status === "transfer") {
        totalTransfer += transaction.amount;
      }
    });

    this.setState({ totalDeposit, totalWithdraw, totalTransfer });
  };

  prepareChartData = () => {
    const groupedTransactions = this.state.transactions.reduce((acc, transaction) => {
      const date = moment(transaction.date).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = { deposit: 0, withdraw: 0, transfer: 0 };
      }
      if (transaction.status === "deposit") {
        acc[date].deposit += transaction.amount;
      } else if (transaction.status === "withdraw") {
        acc[date].withdraw += transaction.amount;
      } else if (transaction.status === "transfer") {
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
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6 mb-3">
            <Link to="/bank">
              <div className="info-box bg-dark">
                <span className="info-box-icon">
                  <i className="fas fa-university"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Bank Balance</span>
                  <span className="info-box-number">रू {totalDeposit - totalWithdraw}</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <Link to="/deposit">
              <div className="info-box bg-success">
                <span className="info-box-icon">
                  <i className="fas fa-arrow-circle-up"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Total Deposit</span>
                  <span className="info-box-number">रू {totalDeposit}</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <Link to="/withdraw">
              <div className="info-box bg-danger">
                <span className="info-box-icon">
                  <i className="fas fa-arrow-circle-down"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Total Withdraw</span>
                  <span className="info-box-number">रू {totalWithdraw}</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="info-box bg-info">
              <span className="info-box-icon">
                <i className="fas fa-exchange-alt"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Total Transfer</span>
                <span className="info-box-number">रू {totalTransfer}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-9">
            <div className="card">
              <div className="card-body">
                <ReactApexChart options={options} series={series} type="line" height={350} />
              </div>
            </div>

            {/* Heatmap */}
            <div className="card mt-4">
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
                        { x: "Shrawan", y: 10 },
                        { x: "Bhadra", y: 15 },
                        { x: "Asoj", y: 8 },
                        { x: "Kartik", y: 25 },
                        { x: "Mangsir", y: 30 },
                        { x: "Poush", y: 28 },
                        { x: "Magh", y: 21 },
                        { x: "Falgun", y: 18 },
                        { x: "Chaitra", y: 32 },
                        { x: "Baisakh", y: 35 },
                        { x: "Jestha", y: 20 },
                        { x: "Asar", y: 15 },
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
      </div>
    );
  }
}

export default Transfer;
