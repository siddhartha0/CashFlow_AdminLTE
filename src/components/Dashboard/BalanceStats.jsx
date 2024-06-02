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
      <div
        className=" d-flex  flex-row shadow-md  bg-opacity-[.7] p-2 justify-evenly  rounded-xl text-capitalize "
        style={{
          // width: "100%",
          background: "#FFFFFF",
          borderRadius: "16px",
          backdropFilter: "blur(5px)",
          border: " 1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="m-2 p-2 d-flex flex-col gap-2 place-items-end">
          <div className="mt-10 gap-2 flex flex-col place-items-end ">
            <div className="donut">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="donut"
                width="300"
              />
            </div>

            <div className="mt-4">
              <article
                className="text-xl  text-capitalize "
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
            height: "277px",
            marginTop: "15px",
            position: "absolute",
            right: "240px",
            background: "#DDDFE1",
          }}
        />

        <div className="m-2 p-2 d-flex  flex-column gap-4 text-sm  relative">
          <div className="d-flex flex-column text-lg">
            <CiBank className="text-xl place-self-start text-hold" />

            <strong className="text-primary  text-opacity-95 mt-3 ">
              Bank Balance:
            </strong>

            <span className="font-semibold text-primary  text-opacity-55 ">
              {currentBankBalance ?? 0}
            </span>
          </div>
          <hr
            className="text-dark text-opacity-50"
            style={{
              width: "200px",
              height: ".5px",
              marginTop: "20px",
              background: "#DDDFE1",
              // background: "black",
            }}
          />

          <div className="mt-3">
            <div className="d-flex flex-column text-lg  relative ">
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
