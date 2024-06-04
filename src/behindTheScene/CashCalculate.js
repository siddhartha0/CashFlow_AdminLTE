import Balance from "./balance/Balance.js";

function check() {
  const balance = new Balance();
  balance.stats_Holder();
  if (balance.bank_Complete_Money_History) {
    console.log(balance.bank_Complete_Money_History);
    balance.calculateTotalIncoming(balance.bank_Complete_Money_History);
  }
  balance.mapIncomeSource();
}

check();
