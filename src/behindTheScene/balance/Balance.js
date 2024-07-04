export default class Balance {
  constructor() {}

  min = 0;
  max = 10000;
  duration = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "july",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  latest_Bank_Money = 0;
  latest_Wallet_Money = 0;
  total_Amount = 0;
  bank_trend = 0;
  wallet_trend = 0;
  overall_trend = 0;
  bank_status = "";
  wallet_status = "";
  overall_status = "";
  error = "";
  avgAmount = 0;
  totalIncoming = 0;
  totalOutgoing = 0;

  bank_Complete_Money_History = [];
  wallet_Complete_Money_History = [];

  total_bank_Incoming_Amount = [];
  total_bank_Spent_Amount = [];

  total_wallet_Incoming_Amount = [];
  total_wallet_Spent_Amount = [];

  incomeTypes = ["Salary", "Rent", "Borrowed Taken"];
  expenseTypes = [
    "Clothes",
    "Food",
    "Health",
    "Travels",
    "Entertainment",
    "Study",
    "Rent",
    "Lend",
  ];

  stats_Holder() {
    this.duration.map((duration, i) => {
      if (duration) {
        const bank_Money = this.generateMoney();
        const wallet_Money = this.generateMoney();

        if (i <= this.duration.length) {
          this.bank_Complete_Money_History.push(bank_Money);
          this.wallet_Complete_Money_History.push(wallet_Money);
        }
        if (i == this.duration.length - 1) {
          this.latest_Bank_Money = bank_Money;
          this.latest_Wallet_Money = wallet_Money;
          this.total_Amount = bank_Money + wallet_Money;
        }
      } else {
        this.error = "";
      }
    });
  }

  measureHighestAmount(moneyhistory) {
    var temp = [];
    temp = moneyhistory;
    var highest = 0;
    if (moneyhistory.length > 0) {
      const sorted = temp.sort((a, b) => (a > b ? 1 : -1));
      highest = sorted[moneyhistory.length - 1];
    }

    return highest;
  }

  measureLowestAmount(moneyhistory) {
    var temp = [];
    temp = moneyhistory;

    var lowest = 0;
    if (moneyhistory.length > 0) {
      const sorted = temp.sort((a, b) => (a > b ? 1 : -1));
      lowest = sorted[0];
    }

    return lowest;
  }

  measureAverageMoney(moneyhistory) {
    let sum = 0;
    if (moneyhistory.length > 0) {
      moneyhistory.reduce((a, b) => (sum = a + b));
    }
    this.avgAmount = Math.ceil(sum / moneyhistory.length);
    return this.avgAmount;
  }

  aboveAvg(moneyHistory) {
    var aboveAbg = 0;
    if (moneyHistory.length > 0) {
      moneyHistory.map((history) => {
        if (history > this.avgAmount) {
          aboveAbg += 1;
        }
      });
    }
    return ((aboveAbg / moneyHistory.length) * 100).toFixed(1);
  }

  belowAvg(moneyHistory) {
    var below = 0;

    if (moneyHistory.length > 0) {
      moneyHistory.map((history) => {
        if (history < this.avgAmount) {
          below += 1;
        }
      });
    }
    return ((below / moneyHistory.length) * 100).toFixed(1);
  }

  generateMoney() {
    return Math.ceil(Math.random() * (this.max - this.min) + this.min);
  }

  genMonthlyBalance(highestAmount) {
    const totaldays = 30;
    const monthsAmount = [];
    for (let i = 0; i < totaldays; i++) {
      if (i < totaldays - 1) {
        const eachDayAmount = this.genIncome(highestAmount);
        monthsAmount.push(eachDayAmount);
      }
      if (i === totaldays - 1) {
        monthsAmount.push(highestAmount);
      }
    }
    return monthsAmount;
    // console.log(monthsAmount);
  }

  calculateTrends() {
    const prevMonthMoney_Bank =
      this.bank_Complete_Money_History[
        this.bank_Complete_Money_History.length - 2
      ];

    const bankDifference = this.latest_Bank_Money - prevMonthMoney_Bank;

    bankDifference >= 0
      ? (this.bank_status = "up")
      : (this.bank_status = "down");

    this.bank_trend = Math.abs(bankDifference / 100);

    const prevMonthMoney_Wallet =
      this.wallet_Complete_Money_History[
        this.wallet_Complete_Money_History.length - 2
      ];
    const walletDifference = this.latest_Wallet_Money - prevMonthMoney_Wallet;

    walletDifference >= 0
      ? (this.wallet_status = "up")
      : (this.wallet_status = "down");

    this.wallet_trend = Math.abs(walletDifference / 100);

    const prevMonthTotalAmount = prevMonthMoney_Bank + prevMonthMoney_Wallet;
    const difference_in_total = this.total_Amount - prevMonthTotalAmount;

    difference_in_total >= 0
      ? (this.overall_status = "up")
      : (this.overall_status = "down");

    this.overall_trend = Math.abs(difference_in_total / 100);
  }

  calculate_Income_Expense(history, label) {
    if (history && history.length > 0) {
      history.map((money, index, array) => {
        if (index === 0) {
          label === "bank"
            ? this.total_bank_Incoming_Amount.push(money)
            : this.total_wallet_Incoming_Amount.push(money);
        }

        if (index <= array.length - 2) {
          if (money < array[index + 1]) {
            const difference = array[index + 1] - money;
            this.totalIncoming += difference;
            if (label === "bank") {
              if (index === 0) {
                this.total_bank_Spent_Amount.push(0);
              }
              this.total_bank_Spent_Amount.push(0);
              this.total_bank_Incoming_Amount.push(difference);
            } else {
              if (index === 0) {
                this.total_wallet_Spent_Amount.push(0);
              }
              this.total_wallet_Spent_Amount.push(0);
              this.total_wallet_Incoming_Amount.push(difference);
            }
          } else {
            const difference = money - array[index + 1];
            this.totalOutgoing += difference;
            if (label === "bank") {
              if (index === 0) {
                this.total_bank_Spent_Amount.push(0);
              }
              this.total_bank_Spent_Amount.push(difference);
              this.total_bank_Incoming_Amount.push(0);
            } else {
              if (index === 0) {
                this.total_wallet_Spent_Amount.push(0);
              }
              this.total_wallet_Spent_Amount.push(difference);
              this.total_wallet_Incoming_Amount.push(0);
            }
          }
        }
      });
    }
  }

  mapIncomeSource(total) {
    const incomeSource = [];
    var sources = {};
    var amount = 0;

    this.incomeTypes.map((income, i, array) => {
      if (i === 0) {
        amount = this.genIncome(total);
        sources = {
          amount: amount,
          source: income,
        };
        incomeSource.push(sources);
      }
      if (i > 0) {
        const difference = total - amount;
        const dividedEqually = Math.ceil(difference / (array.length - 1));
        sources = {
          amount: dividedEqually,
          source: income,
        };
        incomeSource.push(sources);
      }
    });

    return incomeSource;
  }

  mapExpenseSource(total) {
    var expenseSource = [];
    var sources = {};
    var amount = 0;

    this.expenseTypes.map((income, i, array) => {
      if (i === 0) {
        amount = this.genIncome(total);
        sources = {
          amount: amount,
          source: income,
        };
        expenseSource.push(sources);
      }
      if (i > 0) {
        const difference = total - amount;
        const dividedEqually = Math.ceil(difference / (array.length - 1));
        sources = {
          amount: dividedEqually,
          source: income,
        };
        expenseSource.push(sources);
      }
    });

    return expenseSource;
  }

  genIncome(total) {
    return Math.ceil(Math.random() * total);
  }
}
