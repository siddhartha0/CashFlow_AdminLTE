import Balance from "./balance/Balance.js";

function check() {
  
  const balance = new Balance();
  balance.stats_Holder();
  const label = balance.duration;
  var fullYearAmountInfo = [];

  if (balance.bank_Complete_Money_History) {
    label.map((month, i) => {
      const newData = {
        month: month,
        currentAmount: balance.bank_Complete_Money_History[i],
      };
      fullYearAmountInfo.push(newData);
    });
  }
  var totalHistory_Of_MONEY = [];

  if (fullYearAmountInfo) {
    fullYearAmountInfo.map((amount) => {
      const eachDayAmount = balance.genMonthlyBalance(amount.currentAmount);
      const newData = {
        month: amount.month,
        currentAmount: amount.currentAmount,
        eachDaysAmount: eachDayAmount,
      };
      totalHistory_Of_MONEY.push(newData);
    });
  }

 }

check();
