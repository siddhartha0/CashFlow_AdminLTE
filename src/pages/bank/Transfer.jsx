import React, { Component } from "react";
import { Link } from "react-router-dom";
import { generateRandomTransactions } from "../../behindTheScene/api/bank";
import Chart from "react-apexcharts";
import TransactionTable from "../../components/bank/TransactionTable";

class Transfer extends Component {
  constructor() {
    super();
    this.state = {
      totalDeposit: 0,
      totalWithdraw: 0,
      totalTransfer: 0,
      transactions: generateRandomTransactions(20),
      options1: {
        chart: {
          stacked: true,
          zoom: {
            enabled: true,
            type: 'x',
          },
          toolbar: {
            show: true,
            tools: {
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            }
          }
        },
        xaxis: {
          categories: [],
          labels: {
            show: false 
          }
        },
        fill: {
          opacity: 0.5,
          colors: ['#008FFB', '#00E396']
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
      },
      options2: {
        chart: {
          stacked: true,
          zoom: {
            enabled: true,
            type: 'x',
          },
          toolbar: {
            show: true,
            tools: {
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            }
          }
        },
        xaxis: {
          categories: [],
          labels: {
            show: false 
          }
        },
        fill: {
          opacity: 0.5,
          colors: ['#FF4560']
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        },
      },
      series1: [
        {
          name: "Total Deposit",
          data: []
        },
        {
          name: "Total Withdraw",
          data: []
        }
      ],
      series2: [
        {
          name: "Total Transfer",
          data: []
        }
      ],
      donutOptions: {
        chart: {
          type: 'donut'
        },
        labels: ['Card', 'Cheque', 'Wallet'],
        legend: {
          position: 'bottom'
        }
      },
      transactionCountSeries: [],
      transactionAmountSeries: []
    };
  }

  componentDidMount() {
    this.calculateTotals();
    this.prepareChartData();
    this.prepareDonutChartData();
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
    const today = new Date();
    const past30Days = new Date(today);
    past30Days.setDate(today.getDate() - 29); // Get the date 30 days ago

    const transactionsInRange = this.state.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= past30Days && transactionDate <= today;
    });

    const groupedTransactions = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(past30Days);
      date.setDate(past30Days.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];
      return { date: formattedDate, deposit: 0, withdraw: 0, transfer: 0 };
    }).reduce((acc, day) => {
      acc[day.date] = day;
      return acc;
    }, {});

    transactionsInRange.forEach((transaction) => {
      const date = new Date(transaction.date).toISOString().split('T')[0];
      if (groupedTransactions[date]) {
        if (transaction.status === "deposit") {
          groupedTransactions[date].deposit += transaction.amount;
        } else if (transaction.status === "withdraw") {
          groupedTransactions[date].withdraw += transaction.amount;
        } else if (transaction.status === "transfer") {
          groupedTransactions[date].transfer += transaction.amount;
        }
      }
    });

    const categories = Object.keys(groupedTransactions);

    const series1 = [
      {
        name: "Total Deposit",
        data: categories.map((date) => groupedTransactions[date].deposit),
      },
      {
        name: "Total Withdraw",
        data: categories.map((date) => groupedTransactions[date].withdraw),
      }
    ];

    const series2 = [
      {
        name: "Total Transfer",
        data: categories.map((date) => groupedTransactions[date].transfer),
      }
    ];

    this.setState({
      series1,
      series2,
      options1: { ...this.state.options1, xaxis: { categories } },
      options2: { ...this.state.options2, xaxis: { categories } },
    });
  };

  prepareDonutChartData = () => {
    const { transactions } = this.state;

    const cardTransfers = transactions.filter(transaction => transaction.method === "card" && transaction.status === "transfer");
    const chequeTransfers = transactions.filter(transaction => transaction.method === "cheque" && transaction.status === "transfer");
    const walletTransfers = transactions.filter(transaction => transaction.method === "wallet" && transaction.status === "transfer");

    const transactionCountSeries = [
      cardTransfers.length,
      chequeTransfers.length,
      walletTransfers.length
    ];

    const transactionAmountSeries = [
      cardTransfers.reduce((sum, transaction) => sum + transaction.amount, 0),
      chequeTransfers.reduce((sum, transaction) => sum + transaction.amount, 0),
      walletTransfers.reduce((sum, transaction) => sum + transaction.amount, 0)
    ];

    this.setState({ transactionCountSeries, transactionAmountSeries });
  };

  render() {
    const { totalDeposit, totalWithdraw, totalTransfer, series1, series2, options1, options2, transactions, donutOptions, transactionCountSeries, transactionAmountSeries } = this.state;

    const transferTransactions = transactions.filter(transaction => transaction.status === "transfer");

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
                  <span className="info-box-number">Rs. {totalDeposit - totalWithdraw}</span>
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
                  <span className="info-box-number">Rs. {totalDeposit}</span>
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
                  <span className="info-box-number">Rs. {totalWithdraw}</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <Link to="/transfer">
              <div className="info-box bg-warning">
                <span className="info-box-icon">
                  <i className="fas fa-exchange-alt"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Total Transfer</span>
                  <span className="info-box-number">Rs. {totalTransfer}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <Chart
                  options={options1}
                  series={series1}
                  type="area"
                  height={350}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card">
              <div class
Name="card-body">
<Chart
  options={options2}
  series={series2}
  type="area"
  height={350}
/>
</div>
</div>
</div>
</div>

<div className="row">
<div className="col-lg-6">
<TransactionTable
transactions={transferTransactions}
status="transfer"
title="Transfer Transactions"
paginate
/>
</div>
<div className="col-lg-6">
<div className="card">
<div className="card-body">
<Chart
  options={donutOptions}
  series={transactionCountSeries}
  type="donut"
  height={350}
/>
</div>
</div>
<div className="card mt-3">
<div className="card-body">
<Chart
  options={donutOptions}
  series={transactionAmountSeries}
  type="donut"
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
