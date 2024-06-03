import { Component } from "react";
import BalanceStats from "../../components/Dashboard/BalanceStats";
import BalanceTrends from "../../components/Dashboard/BalanceTrends";
import BalanceSummary from "../../components/Dashboard/BalanceSummary";
import MenuOptionModel from "../../const/widget_component_model/MenuOptionModel";
import AmountInfo from "../../components/Dashboard/AmountInfo";
import IncomeOutgoing from "../../components/Dashboard/IncomeOutgoing";
import { PickPlatform } from "../../const/PickPlatForm";
import { PickDate } from "../../const/PickDate";

export default class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      selectedPlatform: "Bank",
      selectedDate: "overall",
    };
    this.selectPlatform = this.selectPlatform.bind(this);
    this.pickDate = this.pickDate.bind(this);
  }

  selectPlatform(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      selectedPlatform: value,
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

          <div className="col ">
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
                <div
                  className="  flex-row shadow-md  bg-opacity-[.7] p-4   rounded-xl capitalize m-2  mt-4"
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    backdropFilter: "blur(5px)",
                    border: " 1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <BalanceTrends />
                </div>
              </div>

              <div
                className="col col-md-6 row-8  p-4 text-capitalize "
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  backdropFilter: "blur(5px)",
                  border: " 1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <BalanceSummary />
              </div>
            </div>
          </div>

          <div className="container d-flex  mt-4 ml-2  ">
            <div
              className="col col-md-6   p-4 text-capitalize "
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                backdropFilter: "blur(5px)",
                border: " 1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <AmountInfo header="Bank Amount Summary" label="Bank" />
            </div>
            <div
              className="col col-md-6 row-8  p-4 text-capitalize ml-4 "
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                backdropFilter: "blur(5px)",
                border: " 1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <AmountInfo header="Wallet Amount Summary" label="Wallet" />
            </div>
          </div>

          <div
            className="col col-md-8 d-flex flex-column  p-4 mt-4 ml-3 "
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              backdropFilter: "blur(5px)",
              border: " 1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div className="col-md-2 ">
              <MenuOptionModel
                className="breadcrumb float-sm-right"
                option={PickPlatform}
                PickPlatform={this.selectPlatform}
              />
            </div>
            <div className=" mt-2 ml-2 col-md-9  text-capitalize ">
              <IncomeOutgoing label={this.state.selectedPlatform} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
