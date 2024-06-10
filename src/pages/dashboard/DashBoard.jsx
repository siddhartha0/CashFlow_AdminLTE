import { Component } from "react";
import BalanceStats from "../../components/Dashboard/stats/BalanceStats";
import BalanceTrends from "../../components/Dashboard/BalanceTrends";
import BalanceSummary from "../../components/Dashboard/balanceSummary/summary/BalanceSummary";
import MenuOptionModel from "../../const/widget_component_model/components/MenuOptionModel";
import IncomeExpenseStats from "../../components/Dashboard/IncomeExpenseStats";
import { PickPlatform } from "../../const/PickPlatForm";
import { PickDate } from "../../const/PickDate";
import { TransactionTypes } from "../../const/TransactionTypes";
import IncomeExpenseHistory from "../../components/Dashboard/IncomeExpenseHistory";
import MoreOptionalAccordianModel from "../../const/widget_component_model/components/MoreOptionalAccordianModel";
import Activities from "../../components/Dashboard/activities/Activities";
// import { $ } from "jquery";

export default class DashBoard extends Component {
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

    this.selectPlatform = this.selectPlatform.bind(this);
    this.pickDate = this.pickDate.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectTransactionTypes = this.selectTransactionTypes.bind(this);
  }

  componentDidMount() {
    $(function () {
      $("#sortable").sortable();
    });
  }

  selectPlatform(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      selectedPlatform: value,
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
    return (
      <div className="p-1 ml-3 " id="dashboard_parentDiv">
        <div
          className="d-flex flex-column gap-4  text-black "
          // id="dashboard_Wrapper"
          id="sortable"
        >
          <div
            className=" d-flex justify-content-between"
            // id="dashboard_header_ParentDiv"
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
                DashBoard
              </strong>
              <span id="Greeting" className="text-md">
                {this.state.date.getHours() < 12
                  ? "Good Morning !!"
                  : this.state.date.getHours() <= 18
                  ? "Good Afternoon !!"
                  : "Good Evening !!"}
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
            <div className="row ">
              <div
                className="d-flex flex-column"
                style={{
                  minWidth: "480px",
                }}
              >
                <div
                  className=" custom-card card"
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
                <div className=" d-flex p-3 mt-2 custom-card card">
                  <BalanceTrends />
                </div>
              </div>

              <div className="container card col-md-6 p-4 text-capitalize custom-card ">
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
              <div className="d-flex w-25">
                <MenuOptionModel
                  className="breadcrumb float-sm-right"
                  option={PickPlatform}
                  PickPlatform={this.selectPlatform}
                  selectedPlatform={this.state.selectedPlatform}
                  id="indi_Wallet_Bank"
                />
              </div>
              <div className=" container mb-2 mt-4 text-capitalize ">
                <IncomeExpenseStats label={this.state.selectedPlatform} />
              </div>
            </div>

            <div
              className="container  card d-flex flex-column  p-4  ml-3 custom-card card-header ui-sortable-handle"
              id="sortable"
              style={{
                height: "640px",
                overflowY: "scroll",
              }}
            >
              <div className="col-md-5 ">
                <div>
                  <MenuOptionModel
                    className="breadcrumb float-sm-right"
                    option={TransactionTypes}
                    PickPlatform={this.selectTransactionTypes}
                  />
                </div>
                <div className="mt-4">
                  <IncomeExpenseHistory
                    label={this.state.transactionType}
                    header={this.state.selectedPlatform}
                  />
                </div>
              </div>
            </div>
          </section>

          <div className=" p-3 mt-3 connectedSortable" id="sortable">
            <MoreOptionalAccordianModel title="Activities">
              <div className=" d-flex  flex-column   ">
                <Activities />
              </div>
            </MoreOptionalAccordianModel>
          </div>
        </div>
      </div>
    );
  }
}
