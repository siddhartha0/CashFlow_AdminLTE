import { Component } from "react";
import DynamicTable from "../../../const/widget_component_model/table/DynamicTable";
import { generateRandomTransactions } from "../../../behindTheScene/api/bank";
import SingleBarChart from "../../../const/widget_component_model/charts/SingleBarChart";
import SingleLineChart from "../../../const/widget_component_model/charts/SingleLineChart";
import TotalView from "../TotalView";
import ChartComponent from "../Chart";

export default class Deposit extends Component {
  render() {
    const headers = [
      { key: "account", label: "Account" },
      { key: "bank", label: "Bank" },
      { key: "type", label: "Type" },
      { key: "amount", label: "Amount" },
    ];

    const transaction = generateRandomTransactions(100);
    const value = JSON.parse(localStorage.getItem("dashboard"));
    const filterData = transaction.filter((transaction) => {
      return transaction.status === "deposit";
    });

    const getTotalTransaction = (status) => {
      let total = transaction
        .filter((transaction) => transaction.status === status)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return total.toLocaleString();
    };

    return (
      <div className="container-fluid">
        <div className="w-100">
          <div className="d-flex ">
            <div className="col-lg-6">
              <TotalView
                data={getTotalTransaction("deposit")}
                title="Total Deposits"
                color="success"
                icon="fa-solid fa-building-columns"
                design="info-box-1"
              />
            </div>
            <div className="col-lg-6">
              <TotalView
                data={filterData.length}
                title="Total Transactions"
                color="primary"
                icon="fa-solid fa-money-bill-trend-up"
                design="info-box-1"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <SingleBarChart
                data={value.bankhistory}
                label={value.label}
                name={"Deposit"}
              />
            </div>

            <div className="col-lg-6">
              <SingleLineChart
                data={value.bankhistory}
                label={value.label}
                name={"Deposit"}
              />
            </div>
            <div className="col-12 mt-4">
              <h2>Total Deposits</h2>
              <DynamicTable
                data={filterData}
                headers={headers}
                pageNo="10"
                total={true}
              />
            </div>
            <ChartComponent
              dataYearly={value.bankhistory}
              dataWeekly={value.bankhistory}
              dataDaily={value.bankFullYearHistory[0].eachDaysAmount}
              labelYearly={value.label}
              labelWeekly={value.label}
              labelDaily={value.label}
              name={"Deposit"}
            />
          </div>
        </div>
      </div>
    );
  }
}
