import { Component, useEffect, useState } from "react";
import BalanceStats from "../../components/Dashboard/stats/BalanceStats";
import BalanceTrends from "../../components/Dashboard/BalanceTrends";
import BalanceSummary from "../../components/Dashboard/balanceSummary/summary/BalanceSummary";
import MenuOptionModel from "../../const/widget_component_model/components/MenuOptionModel";
import IncomeExpenseStats from "../../components/Dashboard/IncomeExpenseStats";
import { PickDate } from "../../const/PickDate";
import IncomeExpenseHistory from "../../components/Dashboard/IncomeExpenseHistory";
import PropTypes from "prop-types";
import HeadController from "../../behindTheScene/helper/HeadController";
import TransactionDataHandler from "../../behindTheScene/helper/TransactionDataHandler";
import BarChartDataHandler from "../../behindTheScene/helper/BarChartDataHandler";
import Projection from "../../components/Dashboard/projection/Projection";
import BankRank from "../../components/Dashboard/rank/BankRank";
import Activites from "../../components/Dashboard/activities/Activities";

export default function Dashboard() {
  const {
    user_data,
    loadTime_DataSession,
    transactionFetchLoading,
    withdrawHistory,
    userLinkAccount,
  } = HeadController();

  const init = {
    ...loadTime_DataSession,
    title: "bank",
  };

  const [selectedPlatform, setSelectedPatform] = useState(init ?? null);

  const {
    bankdepositHistory,
    bankdepositLoading,
    bankwithdrawHistory,
    bankwithdrawLoading,
    WithdrawTotalAmount,
    depositTotalAmount,
    userbankDepositsData,
    userbankWithdrawData,
  } = TransactionDataHandler(selectedPlatform);

  const { monthlyTransaction } = BarChartDataHandler(
    2024,
    selectedPlatform?.id
  );

  const selectPlatform = (e) => {
    const value = e.target.value;
    const getSelectedData = userLinkAccount?.filter(
      (account) => account.value === value
    );
    setSelectedPatform(getSelectedData[0]);
  };

  return (
    <DashBoardWrapped
      userDetail={user_data}
      userLinkAccount={userLinkAccount}
      selectPlatform={selectPlatform}
      selectedPlatform={selectedPlatform ?? ""}
      depositLoading={transactionFetchLoading}
      withdrawHistory={withdrawHistory}
      bankdepositHistory={bankdepositHistory}
      bankdepositLoading={bankdepositLoading}
      bankwithdrawHistory={bankwithdrawHistory}
      bankwithdrawLoading={bankwithdrawLoading}
      WithdrawTotalAmount={WithdrawTotalAmount}
      depositTotalAmount={depositTotalAmount}
      userbankDepositsData={userbankDepositsData}
      userbankWithdrawData={userbankWithdrawData}
      overAllTransactionData={monthlyTransaction}
    />
  );
}

class DashBoardWrapped extends Component {
  static propTypes = {
    userDetail: PropTypes.object,
    userLinkAccount: PropTypes.array,
    selectPlatform: PropTypes.func,
    selectedPlatform: PropTypes.object,
    depositHistory: PropTypes.array,
    depositLoading: PropTypes.bool,
    withdrawHistory: PropTypes.array,
    totalDeposits: PropTypes.number,
    totalWithdraw: PropTypes.number,
    bankdepositHistory: PropTypes.array,
    bankdepositLoading: PropTypes.bool,
    bankwithdrawHistory: PropTypes.array,
    bankwithdrawLoading: PropTypes.bool,
    overAllTransactionData: PropTypes.array,
  };

  constructor() {
    super();
    this.state = {
      date: new Date(),
      selectedPlatform: "Bank",
      selectedDate: "overall",
      transactionType: "income",
      currentBankAmount: 0,
      currentWalletAmount: 0,
      id: 0,
      bankEachMonthHistory: [],
      walletEachDayHistory: [],
      overAllSelected: true,
    };

    this.pickDate = this.pickDate.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectTransactionTypes = this.selectTransactionTypes.bind(this);
  }

  componentDidMount() {
    $(function () {
      $("#sortable").sortable();
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

  selectMonth = (key) => {
    const localvalue = JSON.parse(localStorage.getItem("dashboard"));
    this.setState({
      id: key,
    });
    if (key !== 0) {
      this.setState({
        overAllSelected: false,
      });
    }
    if (key === 0) {
      this.setState({
        overAllSelected: true,
      });
    }
    const bankAmount = localvalue.bankFullYearHistory;
    const walletAmount = localvalue.walletFullYearHistory;

    // console.log(this.localValue);

    const getBank = bankAmount.filter((bank, i) => i + 1 === key);
    const getWallet = walletAmount.filter((wallet, i) => i + 1 === key);

    this.setState({
      bankEachMonthHistory: getBank[0].eachDaysAmount,
      walletEachDayHistory: getWallet[0].eachDaysAmount,
      currentBankAmount: getBank[0].currentAmount,
      currentWalletAmount: getWallet[0].currentAmount,
    });
  };

  render() {
    const {
      userDetail,
      userLinkAccount,
      selectPlatform,
      selectedPlatform,
      bankdepositLoading,
      bankwithdrawHistory,
      bankwithdrawLoading,
      WithdrawTotalAmount,
      depositTotalAmount,
      userbankDepositsData,
      userbankWithdrawData,
      overAllTransactionData,
    } = this.props;

    return (
      <div className="p-1 ml-3 " id="dashboard_parentDiv">
        {(bankdepositLoading || bankwithdrawLoading) && <div>Loading...</div>}

        {!(bankdepositLoading && bankwithdrawLoading) && (
          <section
            className="d-flex flex-column gap-4  text-black "
            // id="dashboard_Wrapper"
            id="sortable"
          >
            <div
              className=" d-flex justify-content-between"
              id="dashboard_header_ParentDiv"
              // id="sortable"
            >
              <div
                className="d-flex flex-column mb-4"
                id="dashboard_Greeting_Info"
              >
                <strong
                  id="Info"
                  className="text-lg text-uppercase"
                  style={{
                    color: "#9B4078",
                  }}
                >
                  {userDetail?.username}
                </strong>
                <span id="Greeting" className="text-md">
                  {this.state.date.getHours() < 12
                    ? `Good Morning  !!`
                    : this.state.date.getHours() <= 18
                    ? `Good Afternoon  !!`
                    : `Good Evening  !!`}
                </span>
              </div>

              <div
                className="col-sm-2 float-sm-right"
                id="dashboard_Date_selector"
              >
                <MenuOptionModel
                  className="breadcrumb float-sm-right"
                  option={PickDate}
                  PickPlatform={this.pickDate}
                />
              </div>
            </div>

            <div className="d-flex flex-column" id="sortable">
              <div className=" d-flex ">
                <div
                  className="d-flex flex-column"
                  style={{
                    minWidth: "480px",
                  }}
                >
                  <div
                    className=" custom-card  card"
                    style={{
                      width: "100%",
                    }}
                  >
                    <BalanceStats
                      pickDate={this.state.selectedDate}
                      currentBankAmount={this.state.currentBankAmount}
                      currentWalletAmount={this.state.currentWalletAmount}
                      overAllSelected={this.state.overAllSelected}
                    />
                  </div>
                  <div
                    className=" d-flex p-3 mt-2  custom-card  
                "
                    style={{
                      maxWidth: "480px",
                      overflowX: "scroll",
                      scrollbarWidth: "none",
                    }}
                  >
                    <BalanceTrends />
                  </div>
                </div>

                <div className="container card col-md-6  p-4 text-capitalize custom-card ">
                  <BalanceSummary
                    selectMonth={this.selectMonth}
                    currentId={this.state.id}
                    bankEachDaysAmount={this.state.bankEachMonthHistory}
                    walletEachDayAmount={this.state.walletEachDayHistory}
                    overAllSelected={this.state.id !== 0 ? false : true}
                  />
                </div>
              </div>
            </div>

            <section className="d-flex mt-3 connectedSortable " id="sort">
              <div
                className="card col-md-8 d-flex flex-column  p-4 custom-card card-header ui-sortable-handle"
                id="sortable"
              >
                <div
                  className="d-flex align-items-center justify-content-around "
                  style={{
                    width: "100%",
                  }}
                >
                  <div className="d-flex w-25">
                    <MenuOptionModel
                      className="breadcrumb float-sm-right"
                      option={userLinkAccount}
                      PickPlatform={selectPlatform}
                      selectedPlatform={this.state.selectedPlatform}
                      id="indi_Wallet_Bank"
                    />
                  </div>
                  <div
                    className="d-flex justify-content-xl-end"
                    style={{
                      width: "100%",
                    }}
                  >
                    <header>{selectedPlatform.value}</header>
                  </div>
                </div>
                <div className=" container mb-2 mt-4 text-capitalize ">
                  <IncomeExpenseStats
                    label={this.state.selectedPlatform}
                    totalDeposits={depositTotalAmount}
                    totalWithdraw={WithdrawTotalAmount}
                    overAllTransactionData={overAllTransactionData}
                  />
                </div>
              </div>

              <div
                className="container  card d-flex flex-column  p-4  ml-2 custom-card col-sm-4 card-header "
                style={{
                  height: "620px",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }}
              >
                <Activites selectedPlatform={selectedPlatform} />
              </div>
            </section>

            <section
              className="container  card d-flex flex-column  p-4  ml-3 custom-card col-md-11 card-header ui-sortable-handle"
              id="sortable"
            >
              <div className="mt-4">
                <IncomeExpenseHistory
                  header={selectedPlatform}
                  initData={selectedPlatform}
                />
              </div>
            </section>

            <section className="d-flex mt-3 connectedSortable " id="sort">
              <div
                className="card col-md-7 mr-4 d-flex flex-column  p-4 custom-card card-header ui-sortable-handle"
                id="sortable"
              >
                <Projection />
              </div>

              <div
                className="card  d-flex flex-column  p-4 custom-card card-header ui-sortable-handle"
                id="sortable"
              >
                <BankRank />
              </div>
            </section>
          </section>
        )}
      </div>
    );
  }
}
