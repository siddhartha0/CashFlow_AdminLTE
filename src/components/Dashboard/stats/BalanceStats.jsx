import { Component, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { CiBank, CiWallet } from "react-icons/ci";
import PropTypes from "prop-types";
import DounoughtProps from "./DonoughtProps";
import { useSelector } from "react-redux";
import { userbankDetails } from "../../../slices/slice/bank/UserBankSlice";
import { userWalletDetail } from "../../../slices/slice/wallet/UserWalletSlice";

export default function BalanceStats() {
  const userbank = useSelector(userbankDetails);
  const userwallet = useSelector(userWalletDetail);

  const [bankCurrentAmount, setBankCurrentAmount] = useState();
  const [walletCurrentAmount, setWalletCurrentAmount] = useState();

  useEffect(() => {
    const bankamount = userbank?.map((banks) => banks?.currentAmount);
    const totalCurrentBankAmount = bankamount?.reduce((a, b) => a + b);
    setBankCurrentAmount(totalCurrentBankAmount ?? 0);

    const walletamounts = userwallet?.map((wallet) => wallet?.currentAmount);
    const totalwalletCurrentAmount = walletamounts?.reduce((a, b) => a + b);
    setWalletCurrentAmount(totalwalletCurrentAmount ?? 0);
  }, [userbank, userwallet]);

  return (
    <BalanceStatsWrapped
      bankCurrentAmount={bankCurrentAmount}
      walletCurrentAmount={walletCurrentAmount}
    />
  );
}

class BalanceStatsWrapped extends Component {
  value = {};

  static propTypes = {
    bankCurrentAmount: PropTypes.number,
    walletCurrentAmount: PropTypes.number,
    pickDate: PropTypes.string,
    currentWalletAmount: PropTypes.number,
    overAllSelected: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    const { pickDate } = props;
    console.log(pickDate);
    this.value = JSON.parse(localStorage.getItem("dashboard"));
  }

  render() {
    const { walletCurrentAmount, overAllSelected, bankCurrentAmount } =
      this.props;

    const currentTotal =
      parseInt(bankCurrentAmount) + parseInt(walletCurrentAmount);

    const getDonoughtProps = new DounoughtProps();

    return (
      <div className=" d-flex  flex-row shadow-md   p-0 justify-evenly  rounded-xl text-capitalize ">
        <div className="m-2 p-2 d-flex flex-col  place-items-end">
          <div className="mt-10 gap-2 flex flex-col place-items-end ">
            <div className="donut">
              <Chart
                options={getDonoughtProps.genLabel()}
                series={getDonoughtProps.genData(
                  overAllSelected,
                  bankCurrentAmount,
                  walletCurrentAmount
                )}
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
                {currentTotal}
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
              {overAllSelected ? bankCurrentAmount : bankCurrentAmount ?? 0}
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
                {overAllSelected
                  ? walletCurrentAmount
                  : walletCurrentAmount ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
