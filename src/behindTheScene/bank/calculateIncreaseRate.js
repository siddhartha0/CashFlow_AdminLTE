
const calculateTotalAmount = (data, type, startDate, endDate) => {
    return data
      .filter(transaction => transaction.status === type && new Date(transaction.date) >= startDate && new Date(transaction.date) <= endDate)
      .reduce((total, transaction) => total + transaction.amount, 0);
  };
  
  const calculatePercentageIncrease = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };
  
  export const getTransactionPercentageIncrease = (transactions, type) => {
    const today = new Date();
    const past30DaysStart = new Date(today);
    past30DaysStart.setDate(past30DaysStart.getDate() - 30);
  
    const previous30DaysStart = new Date(past30DaysStart);
    previous30DaysStart.setDate(previous30DaysStart.getDate() - 30);
  
    const past30DaysEnd = today;
    const previous30DaysEnd = past30DaysStart;
  
    const past30DaysTotal = calculateTotalAmount(transactions, type, past30DaysStart, past30DaysEnd);
    const previous30DaysTotal = calculateTotalAmount(transactions, type, previous30DaysStart, previous30DaysEnd);

    const result = calculatePercentageIncrease(past30DaysTotal, previous30DaysTotal)
  
    return result.toFixed(2);
  };

  