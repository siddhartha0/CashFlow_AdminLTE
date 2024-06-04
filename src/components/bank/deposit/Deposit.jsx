import React, { Component } from "react";
import DynamicTable from "../../../const/widget_component_model/DynamicTable";
import { generateRandomTransactions } from "../../../behindTheScene/api/bank";
import SingleBarChart from "../../../const/widget_component_model/SingleBarChart";
import SingleLineChart from "../../../const/widget_component_model/SingleLineChart";

export default class Deposit extends Component {
  render() {
    const headers = [
      { key: "account", label: "Account" },
      { key: "bank", label: "Bank" },
      { key: "type", label: "Type" },
      { key: "amount", label: "Amount" },
    ];

    const transaction = generateRandomTransactions(10);
    const value = JSON.parse(localStorage.getItem("dashboard"));
    const filterData = transaction.filter((transaction) => {
      return transaction.status === "deposit";
    });

    return (
      <div className="w-50 justify-content-center">
        <SingleBarChart
          data={value.bankhistory}
          label={value.label}
          name={"Deposit"}
        />
        <SingleLineChart
          data={value.bankhistory}
          label={value.label}
          name={"Deposit"}
        />
        <DynamicTable data={filterData} headers={headers} />
      </div>
    );
  }
}
