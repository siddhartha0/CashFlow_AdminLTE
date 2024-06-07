import { Component } from "react";
import { CiBank, CiWallet } from "react-icons/ci";
import DisplayTrends from "./trendComps/DisplayTrends";
import { TbView360 } from "react-icons/tb";

export default class BalanceTrends extends Component {
  value = {};
  constructor() {
    super();
    this.value = JSON.parse(localStorage.getItem("dashboard"));
  }

  render() {
    const {
      bankTrend,
      walletTrend,
      bankStatus,
      walletStatus,
      overallStatus,
      overallTrend,
    } = this.value;
    return (
      <div className="d-flex flex-column w-100 ">
        <header
          className="text-lg "
          style={{
            color: "#9B4078",
            fontWeight: 600,
          }}
        >
          Balance Trends
        </header>

        <div className="d-flex justify-content-lg-between  mt-4">
          <div>
            <DisplayTrends
              icon={
                <CiBank className="text-xl place-self-start text-primary" />
              }
              status={bankStatus}
              trend={bankTrend}
              label="Bank"
            />
          </div>

          <hr
            className="text-dark text-opacity-50"
            style={{
              width: ".5px",
              height: "100px",
              marginTop: "-5px",
              background: "#DDDFE1",
            }}
          />

          <div>
            <DisplayTrends
              icon={
                <CiWallet className="text-xl place-self-start text-success" />
              }
              status={walletStatus}
              trend={walletTrend}
              label="Wallet"
            />
          </div>
          <hr
            className="text-dark text-opacity-50"
            style={{
              width: ".5px",
              height: "100px",
              marginTop: "-5px",
              background: "#DDDFE1",
            }}
          />

          <div>
            <DisplayTrends
              icon={
                <TbView360
                  className="text-xl place-self-start "
                  style={{
                    color: "#9B4078",
                  }}
                />
              }
              status={overallStatus}
              trend={overallTrend}
              label="Overall"
            />
          </div>
        </div>
      </div>
    );
  }
}
