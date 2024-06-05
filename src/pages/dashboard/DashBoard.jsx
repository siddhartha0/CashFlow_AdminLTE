import { Component } from "react";
import BalanceStats from "../../components/Dashboard/BalanceStats";
import BalanceTrends from "../../components/Dashboard/BalanceTrends";
import BalanceSummary from "../../components/Dashboard/BalanceSummary";
import MenuOptionModel from "../../const/widget_component_model/MenuOptionModel";
import AmountInfo from "../../components/Dashboard/AmountInfo";
import IncomeExpenseStats from "../../components/Dashboard/IncomeExpenseStats";
import { PickPlatform } from "../../const/PickPlatForm";
import { PickDate } from "../../const/PickDate";
import { TransactionTypes } from "../../const/TransactionTypes";
import IncomeExpenseHistory from "../../components/Dashboard/IncomeExpenseHistory";

export default class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      selectedPlatform: "Bank",
      selectedDate: "overall",
      transactionType: "income",
    };

    this.selectPlatform = this.selectPlatform.bind(this);
    this.pickDate = this.pickDate.bind(this);
    this.selectTransactionTypes = this.selectTransactionTypes.bind(this);
  }

  selectPlatform(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      selectedPlatform: value,
    });
  }

  selectTransactionTypes(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      transactionType: value,
    });
  }

  pickDate(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      selectedDate: value,
    });
  }

  render() {
    return (
      <div className="p-4">
        <div className="d-flex flex-column gap-4  text-black ">
          <div className=" d-flex justify-content-between">
            <div className="d-flex flex-column mb-4">
              <strong
                className="text-xl text-uppercase"
                style={{
                  color: "#9B4078",
                }}
              >
                DashBoard
              </strong>
              <span className="text-lg">
                {this.state.date.getHours() < 12
                  ? "Good Morning !!"
                  : this.state.date.getHours() <= 18
                  ? "Good Afternoon !!"
                  : "Good Evening !!"}
              </span>
            </div>

            <div className="col-sm-2 float-sm-right">
              <MenuOptionModel
                className="breadcrumb float-sm-right"
                option={PickDate}
                PickPlatform={this.pickDate}
              />
            </div>
          </div>

          <div className="d-flex flex-column  ">
            <div className="row ">
              <div className="col-md-6">
                <div
                  className="col "
                  style={{
                    width: "100%",
                  }}
                >
                  <BalanceStats />
                </div>
                <div className="  flex-row shadow-md  bg-opacity-[.7] p-4   rounded-xl capitalize m-2  mt-4 custom-card">
                  <BalanceTrends />
                </div>
              </div>

              <div className="col col-md-6 row-8  p-4 text-capitalize custom-card">
                <BalanceSummary />
              </div>
            </div>
          </div>

          <div className=" d-flex  mt-4 ml-2  ">
            <div className="col col-md-6   p-4 text-capitalize custom-card">
              <AmountInfo header="Bank Amount Summary" label="Bank" />
            </div>
            <div className="col col-md-6 row-8  p-4 text-capitalize ml-4 custom-card">
              <AmountInfo header="Wallet Amount Summary" label="Wallet" />
            </div>
          </div>

          <div className="d-flex mt-4">
            <div className=" col-md-8 d-flex flex-column  p-4  ml-3 custom-card">
              <div className="d-flex w-25">
                <MenuOptionModel
                  className="breadcrumb float-sm-right"
                  option={PickPlatform}
                  PickPlatform={this.selectPlatform}
                />
              </div>
              <div className=" ml-2 mb-2 mt-4    text-capitalize ">
                <IncomeExpenseStats label={this.state.selectedPlatform} />
              </div>
            </div>

            <div
              className="col col-md-4 d-flex flex-column  p-4  ml-3 custom-card "
              style={{
                height: "640px",
                overflowY: "scroll",
              }}
            >
              <div className="col-md-5 ">
                <div>
                  <MenuOptionModel
                    className="breadcrumb float-sm-right"
                    option={TransactionTypes}
                    PickPlatform={this.selectTransactionTypes}
                  />
                </div>
                <div className="mt-4">
                  <IncomeExpenseHistory
                    label={this.state.transactionType}
                    header={this.state.selectedPlatform}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
