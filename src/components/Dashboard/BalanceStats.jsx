import { Component } from "react";
import Chart from "react-apexcharts";
import { CiBank, CiWallet } from "react-icons/ci";

export default class BalanceStats extends Component {
  value = {};

  constructor() {
    super();
    this.value = JSON.parse(localStorage.getItem("dashboard"));
    this.state = {
      options: {
        labels: ["Bank", "Wallet"],
      },
      series: [
        this.value?.currentBankBalance,
        this.value?.currentWalletBalance,
      ],
    };
  }

  render() {
    const { currentBankBalance, currentWalletBalance, totalAmount } =
      this.value;

    return (
      <div className=" d-flex  flex-row shadow-md   p-0 justify-evenly  rounded-xl text-capitalize ">
        <div className="m-2 p-2 d-flex flex-col  place-items-end">
          <div className="mt-10 gap-2 flex flex-col place-items-end ">
            <div className="donut">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="donut"
                width="260"
              />
            </div>

            <div className="mt-4">
              <article
                className="text-lg  text-capitalize "
                style={{
                  color: "#9B4078",
                }}
              >
                Total Amount
              </article>
              <span className="font-semibold text-dark text-lg text-opacity-50">
                {totalAmount ?? "Data is loading"}
              </span>
            </div>
          </div>
        </div>

        <hr
          className="text-dark"
          style={{
            width: ".5px",
            height: "222px",
            marginTop: "15px",
            marginRight: "4px",

            background: "#DDDFE1",
          }}
        />

        <div className="mt-2 p-2 d-flex  flex-column gap-4 text-sm  relative">
          <div className="d-flex flex-column text-md">
            <CiBank className="text-xl place-self-start text-hold" />

            <strong className="text-primary  mt-3  ">Bank Balance:</strong>

            <span className="font-semibold text-primary  text-opacity-55 ">
              {currentBankBalance ?? 0}
            </span>
          </div>
          <hr
            className="text-dark text-opacity-50"
            style={{
              width: "130px",
              height: ".5px",
              marginTop: "22px",
              background: "#DDDFE1",
              // background: "black",
            }}
          />

          <div className="mt-1">
            <div className="d-flex flex-column text-md  relative ">
              <CiWallet className="text-xl place-self-start text-secondary" />

              <strong className="text-success text-opacity-95 mt-2">
                Wallet Balance:
              </strong>

              <span className="font-semibold text-success text-opacity-[0.8]">
                {currentWalletBalance ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
