import Balance from "./balance/Balance";

export default class CashFlow {
  constructor() {}

  balanceCaller() {
    const makeMoney = new Balance();
    var dashboardData = {};

    makeMoney.stats_Holder();
    makeMoney.calculateTrends();

    const bankHistory = makeMoney.bank_Complete_Money_History;
    const walletHistory = makeMoney.wallet_Complete_Money_History;

    dashboardData = {
      ...dashboardData,
      currentBankBalance: makeMoney.latest_Bank_Money,
      currentWalletBalance: makeMoney.latest_Wallet_Money,
      walletHistory: walletHistory,
      bankhistory: bankHistory,
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
