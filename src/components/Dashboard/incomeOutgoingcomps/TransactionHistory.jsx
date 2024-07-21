import { Component, useState } from "react";
import PieChartModel from "../../../const/widget_component_model/charts/PieChartModel";
import ColorBarModel from "../../../const/widget_component_model/charts/ColorBarModel";
import PropTypes from "prop-types";
import TransactionDataHandler from "../../../behindTheScene/helper/TransactionDataHandler";
import HeadController from "../../../behindTheScene/helper/HeadController";

export default function TransactionHistory({ initData }) {
  const { userLinkAccount } = HeadController();

  const [selectedPlatform, setSelectedPatform] = useState(
    initData ? initData : null
  );

  const {
    userbankDepositsData,
    userbankWithdrawData,
    depositTotalAmount,
    WithdrawTotalAmount,
    depositsSource,
    depositsAmount,

    withdrawSource,
    withdrawAmount,
  } = TransactionDataHandler(selectedPlatform);

  const selectPlatformFunc = (account) => {
    setSelectedPatform(account);
  };

  return (
    <TransactionHistoryWrapped
      userLinkAccount={userLinkAccount}
      incomeAmount={depositTotalAmount}
      expenseAmount={WithdrawTotalAmount}
      userbankDepositsData={userbankDepositsData}
      userbankWithdrawData={userbankWithdrawData}
      selectPlatformFunc={selectPlatformFunc}
      selectedPlatform={selectedPlatform}
      depositsSource={depositsSource}
      depositsAmount={depositsAmount}
      withdrawSource={withdrawSource}
      withdrawAmount={withdrawAmount}
    />
  );
}

TransactionHistory.propTypes = {
  initData: PropTypes.object,
};

class TransactionHistoryWrapped extends Component {
  static propTypes = {
    userLinkAccount: PropTypes.array,
    incomeAmount: PropTypes.number,
    expenseAmount: PropTypes.number,
    withdrawHistory: PropTypes.array,
    userbankDepositsData: PropTypes.object,
    userbankWithdrawData: PropTypes.object,
    selectPlatformFunc: PropTypes.func,
    selectedPlatform: PropTypes.object,
    depositsSource: PropTypes.array,
    withdrawSource: PropTypes.array,
    depositsAmount: PropTypes.number,
    withdrawAmount: PropTypes.number,
  };

  render() {
    const {
      userLinkAccount,
      incomeAmount,
      expenseAmount,
      userbankDepositsData,
      userbankWithdrawData,
      selectPlatformFunc,
      selectedPlatform,
      depositsSource,
      depositsAmount,
      withdrawSource,
      withdrawAmount,
    } = this.props;

    return (
      <main
        className="d-flex flex-column w-100 ml-2"
        style={{
          height: "450px",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <section className="d-flex mb-4 ">
          {userLinkAccount &&
            userLinkAccount?.map((account, i) => (
              <div
                key={account.id + i}
                onClick={() => selectPlatformFunc(account)}
                className={`mr-4 d-flex  ${
                  selectedPlatform?.id === account.id
                    ? selectedPlatform.title.toLowerCase().includes("bank")
                      ? "text-blue"
                      : "text-green"
                    : ""
                }`}
              >
                <article>{account.value}</article>
                {i !== userLinkAccount.length - 1 && (
                  <div
                    className="text-dark text-opacity-50 ml-3"
                    style={{
                      width: ".8px",
                      height: "25px",
                      background: "#DDDFE1",
                    }}
                  />
                )}
              </div>
            ))}
        </section>

        <section className="d-flex justify-content-between">
          <div>
            <header
              className="text-lg-center text-bold mb-3 "
              style={{ color: "#FEB019" }}
            >
              Income
            </header>
            {userbankDepositsData ? (
              <PieChartModel source={depositsSource} amount={depositsAmount} />
            ) : (
              <div>Empty!!!</div>
            )}
            <div className="d-flex flex-column mt-5">
              {depositsSource ? (
                depositsSource?.map((source, i) => (
                  <div key={source + i} className="d-flex my-2 ">
                    <ColorBarModel
                      title={source ?? "others"}
                      totalAmount={incomeAmount ?? 0}
                      actualAmount={depositsAmount[i] ?? 0}
                      color="#FFCB30"
                    />
                  </div>
                ))
              ) : (
                <div>No data to render</div>
              )}
            </div>
          </div>
          <hr
            className="text-dark text-opacity-50"
            style={{
              width: ".5px",
              height: "1020px",
              // marginLeft: "15px",
              // marginTop: "-5px",
              background: "#DDDFE1",
            }}
          />

          <div>
            <header
              className="text-lg-center text-bold mb-3"
              style={{
                color: "#DC3545",
              }}
            >
              Expense
            </header>

            {userbankWithdrawData ? (
              <PieChartModel source={withdrawSource} amount={withdrawAmount} />
            ) : (
              <div className="text-black text-bold text-md">Empty!!!</div>
            )}

            <div className="d-flex flex-column mt-5">
              {userbankWithdrawData ? (
                withdrawSource?.map((source, i) => (
                  <div key={source + i} className="d-flex my-2">
                    <ColorBarModel
                      title={source ?? "others"}
                      totalAmount={expenseAmount}
                      actualAmount={withdrawAmount[i] ?? 0}
                      color="#DC3545"
                    />
                  </div>
                ))
              ) : (
                <div
                  className="text-black  text-md  "
                  style={{
                    marginTop: "-2.6rem",
                    minWidth: "15rem",
                  }}
                >
                  No data to render
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }
}
