import Balance from "./balance/Balance";

export default class CashFlow {
  constructor() {}

  balanceCaller() {
    const makeMoney = new Balance();
    var dashboardData = {};

    makeMoney.stats_Holder();
    makeMoney.calculateTrends();

    const label = makeMoney.duration;
    var fullYearAmountInfo = [];

    const bankHistory = makeMoney.bank_Complete_Money_History;
    const walletHistory = makeMoney.wallet_Complete_Money_History;

    var bank_totalHistory_Of_MONEY = [];

    if (fullYearAmountInfo) {
      bankHistory.map((amount, i) => {
        const eachDayAmount = makeMoney.genMonthlyBalance(amount);
        const newData = {
          month: label[i],
          currentAmount: amount,
          eachDaysAmount: eachDayAmount,
        };
        bank_totalHistory_Of_MONEY.push(newData);
      });
    }
    var wallet_totalHisotry_Of_Money = [];
    if (fullYearAmountInfo) {
      walletHistory.map((amount, i) => {
        const eachDayAmount = makeMoney.genMonthlyBalance(amount);
        const newData = {
          month: label[i],
          currentAmount: amount,
          eachDaysAmount: eachDayAmount,
        };
        wallet_totalHisotry_Of_Money.push(newData);
      });
    }

    dashboardData = {
      ...dashboardData,
      currentBankBalance: makeMoney.latest_Bank_Money,
      currentWalletBalance: makeMoney.latest_Wallet_Money,
      walletHistory: walletHistory,
      bankhistory: bankHistory,
      bankFullYearHistory: bank_totalHistory_Of_MONEY,
      walletFullYearHistory: wallet_totalHisotry_Of_Money,
      label: makeMoney.duration,
      bankTrend: makeMoney.bank_trend,
      walletTrend: makeMoney.wallet_trend,
      overallTrend: makeMoney.overall_trend,
      bankStatus: makeMoney.bank_status,
      walletStatus: makeMoney.wallet_status,
      overallStatus: makeMoney.overall_status,
      totalAmount: makeMoney.total_Amount,
    };

    localStorage.setItem("dashboard", JSON.stringify(dashboardData));
  }
}
