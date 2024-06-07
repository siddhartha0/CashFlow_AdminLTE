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
  var eachDays_Amount = [];
  var totalHistory_Of_MONEY = [];

  if (fullYearAmountInfo) {
    fullYearAmountInfo.map((amount, i, arr) => {
      console.log(amount.currentAmount);
      const eachDayAmount = balance.genMonthlyBalance(amount.currentAmount);
      const newData = {
        month: amount.month,
        currentAmount: amount.currentAmount,
        eachDaysAmount: [eachDays_Amount.push(eachDayAmount)],
      };
      console.log(newData);
      totalHistory_Of_MONEY.push(newData);
    });
  }

  console.log(totalHistory_Of_MONEY);

  // console.log(totalHistory_Of_MONEY);

  // balance.mapIncomeSource();
  // balance.calculate_Income_Expense(balance.bank_Complete_Money_History, "bank");
}

check();
