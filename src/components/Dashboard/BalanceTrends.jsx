import { Component } from "react";
import { CiBank, CiWallet } from "react-icons/ci";
import DisplayTrends from "./trendComps/DisplayTrends";
import { TbView360 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { userbankDetails } from "../../slices/slice/bank/UserBankSlice";
import PropTypes from "prop-types";
import { userWalletDetail } from "../../slices/slice/wallet/UserWalletSlice";

export default function BalanceTrends() {
  const userbank = useSelector(userbankDetails);

  const userwallet = useSelector(userWalletDetail);

  return <BalanceTrendsWrapped userbank={userbank} userwallet={userwallet} />;
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
            {userbank.length &&
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

            {userwallet.length &&
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
          </div>
        </div>
      </div>
    );
  }
}
