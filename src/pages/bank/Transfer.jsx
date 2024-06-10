import React, { Component } from "react"; // Import React and Component from React library
import { generateRandomTransactions } from "../../behindTheScene/api/bank"; // Import the function to generate random transactions
import Chart from "react-apexcharts"; // Import the Chart component from react-apexcharts library
import TransactionTable from "../../components/bank/TransactionTable"; // Import TransactionTable component
import TransactionChart from "../../components/bank/TransactionChart"; // Import TransactionChart component
import TotalView from "../../components/bank/TotalView"; // Import TotalView component

class Transfer extends Component { // Define Transfer component extending React.Component
  constructor() {
    super();
    // Initialize state with default values
    this.state = {
      totalDeposit: 0,
      totalWithdraw: 0,
      totalTransfer: 0,
      transactions: generateRandomTransactions(100), // Generate 100 random transactions
      options1: { // Options for the first chart (deposits and withdrawals)
        chart: {
          zoom: { enabled: true, type: 'x' },
          toolbar: { show: true, tools: { zoom: true, zoomin: true, zoomout: true, pan: true, reset: true } }
        },
        xaxis: { categories: [], labels: { show: false } },
        fill: { opacity: 0.5, colors: ['#008FFB', '#00E396'] },
        legend: { position: 'top', horizontalAlign: 'left' }
      },
      options2: { // Options for the second chart (transfers)
        chart: {
          zoom: { enabled: true, type: 'x' },
          toolbar: { show: true, tools: { zoom: true, zoomin: true, zoomout: true, pan: true, reset: true } }
        },
        xaxis: { categories: [], labels: { show: false } },
        fill: { opacity: 0.5, colors: ['#FF4560'] },
        legend: { position: 'top', horizontalAlign: 'left' }
      },
      series1: [ // Series data for the first chart (deposits and withdrawals)
        { name: "Total Deposit", data: [] },
        { name: "Total Withdraw", data: [] }
      ],
      series2: [ // Series data for the second chart (transfers)
        { name: "Total Transfer", data: [] }
      ]
    };
  }

  componentDidMount() {
    this.calculateTotals(); // Calculate totals when component mounts
    this.prepareChartData(); // Prepare chart data when component mounts
    $(function () {
      $("#sortable").sortable(); // Enable sorting functionality on elements with id "sortable"
    });
  }

  calculateTotals = () => { // Function to calculate total deposit, withdraw, and transfer amounts
    let totalDeposit = 0;
    let totalWithdraw = 0;
    let totalTransfer = 0;

    this.state.transactions.forEach((transaction) => { // Loop through transactions to calculate totals
      if (transaction.status === "deposit") {
        totalDeposit += transaction.amount;
      } else if (transaction.status === "withdraw") {
        totalWithdraw += transaction.amount;
      } else if (transaction.status === "transfer") {
        totalTransfer += transaction.amount;
      }
    });

    // Update state with calculated totals
    this.setState({ 
      totalDeposit, 
      totalWithdraw, 
      totalTransfer
    });
  };

  prepareChartData = () => { // Function to prepare data for charts
    const today = new Date(); // Get today's date
    const past30Days = new Date(today);
    past30Days.setDate(today.getDate() - 29); // Calculate date 30 days ago

    const transactionsInRange = this.state.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= past30Days && transactionDate <= today; // Filter transactions within the last 30 days
    });

    const groupedTransactions = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(past30Days);
      date.setDate(past30Days.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
      return { date: formattedDate, deposit: 0, withdraw: 0, transfer: 0 };
    }).reduce((acc, day) => {
      acc[day.date] = day;
      return acc;
    }, {});

    transactionsInRange.forEach((transaction) => { // Aggregate transactions by date
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

    const categories = Object.keys(groupedTransactions); // Get dates as categories for x-axis

    const series1 = [ // Prepare data series for the first chart
      {
        name: "Total Deposit",
        data: categories.map((date) => groupedTransactions[date].deposit),
      },
      {
        name: "Total Withdraw",
        data: categories.map((date) => groupedTransactions[date].withdraw),
      }
    ];

    const series2 = [ // Prepare data series for the second chart
      {
        name: "Total Transfer",
        data: categories.map((date) => groupedTransactions[date].transfer),
      }
    ];

    // Update state with prepared data for charts
    this.setState({
      series1,
      series2,
      options1: { ...this.state.options1, xaxis: { categories } },
      options2: { ...this.state.options2, xaxis: { categories } },
    });
  };

  render() {
    const { totalDeposit, totalWithdraw, totalTransfer, series1, series2, options1, options2, transactions } = this.state;

    const transferTransactions = transactions.filter(transaction => transaction.status === "transfer"); // Filter transfer transactions

    // Define the Total Transfer box details
    const totalTransferBox = {
      data: "transfer",
      title: "Total Transfer",
      color: "secondary",
      icon: "fa-solid fa-money-bill-transfer",
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <TotalView
              data={totalTransfer.toLocaleString()}
              title={totalTransferBox.title}
              color={totalTransferBox.color}
              icon={totalTransferBox.icon}
              design="info-box-2"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <Chart
                  options={{
                    ...options1,
                    chart: {
                      ...options1.chart,
                      type: 'line'
                    }
                  }}
                  series={series1}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <Chart
                  options={{
                    ...options2,
                    chart: {
                      ...options2.chart,
                      type: 'line'
                    }
                  }}
                  series={series2}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="custom-card p-3">
              <TransactionChart
                transactions={transactions}
                type="transfer"
                title="Remarks"
              />
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
        </div>
      </div>
    );
  }
}

export default Transfer; // Export Transfer component
