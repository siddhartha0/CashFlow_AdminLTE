import { Component } from "react";
import BalanceStats from "../Dashboard/BalanceStats";
import BalanceTrends from "../Dashboard/BalanceTrends";
import BalanceSummary from "../Dashboard/BalanceSummary";
import MenuOptionModel from "../../const/widget_component_model/MenuOptionModel";
import AmountInfo from "../Dashboard/AmountInfo";
import CashFlow from "../../behindTheScene/CashFlow";

export default class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
  }
  componentDidMount() {
    new CashFlow().balanceCaller();
  }

  render() {
    return (
      <div className="content-wrapper p-4 ">
        <div className="d-flex flex-column gap-4  text-black   ">
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
              <MenuOptionModel className="breadcrumb float-sm-right" />
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
        </div>
      </div>
    );
  }
}
