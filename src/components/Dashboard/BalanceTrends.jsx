import { Component } from "react";
import { CiBank, CiWallet } from "react-icons/ci";
import DisplayTrends from "./trendComps/DisplayTrends";
import { TbView360 } from "react-icons/tb";
import PropTypes from "prop-types";
import HeadController from "../../behindTheScene/helper/HeadController";

export default function BalanceTrends() {
  const { user_Bank_Data, user_wallet_Data } = HeadController();
  return (
    <BalanceTrendsWrapped
      userbank={user_Bank_Data}
      userwallet={user_wallet_Data}
    />
  );
}

class BalanceTrendsWrapped extends Component {
  static propTypes = {
    userbank: PropTypes.object,
    userwallet: PropTypes.object,
  };

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

    const { userbank, userwallet } = this.props;

    return (
      <div className="d-flex  flex-column  ">
        <header
          className="text-lg"
          style={{
            color: "#9B4078",
            fontWeight: 600,
          }}
        >
          Balance Trends
        </header>

        <div className="d-flex justify-content-between overflow-x-scroll mt-4">
          <div className="d-flex   ">
            {userbank &&
              userbank?.length &&
              userbank?.map((bankDetails) => (
                <div
                  className="d-flex
                    justify-content-lg-between   mr-4"
                  style={{
                    minWidth: "180px",
                  }}
                  key={bankDetails?.bankName}
                >
                  <DisplayTrends
                    icon={
                      <CiBank className="text-xl place-self-start text-primary " />
                    }
                    status={bankStatus}
                    amount={bankDetails?.currentAmount}
                    label={bankDetails?.bankName}
                  />
                  <hr
                    className="text-dark text-opacity-50"
                    style={{
                      width: ".5px",
                      height: "100px",
                      marginLeft: "15px",
                      marginTop: "-5px",
                      background: "#DDDFE1",
                    }}
                  />
                </div>
              ))}

            {userwallet &&
              userwallet.length &&
              userbank?.map((walletDetails) => (
                <div
                  className="d-flex  justify-content-lg-between  mr-4"
                  key={walletDetails.bankName}
                  style={{
                    minWidth: "180px",
                  }}
                >
                  <DisplayTrends
                    icon={
                      <CiWallet className="text-xl place-self-start text-primary" />
                    }
                    status={bankStatus}
                    trend={bankTrend}
                    label="Bank"
                  />
                  <hr
                    className="text-dark text-opacity-50"
                    style={{
                      width: ".5px",
                      height: "100px",
                      marginLeft: "15px",
                      marginTop: "-5px",
                      background: "#DDDFE1",
                    }}
                  />
                </div>
              ))}

            {userbank &&
              !userbank.length &&
              userwallet &&
              !userwallet.length && (
                <div
                  className="text-black  text-md  "
                  style={{
                    minWidth: "15rem",
                  }}
                >
                  No data to render
                </div>
              )}

            {((userbank && userbank.length) ||
              (userwallet && userwallet.length)) && (
              <div
                style={{
                  minWidth: "120px",
                }}
              >
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
            )}
          </div>
        </div>
      </div>
    );
  }
}
