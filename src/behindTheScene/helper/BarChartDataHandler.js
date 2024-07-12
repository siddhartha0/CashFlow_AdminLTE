import { useGetTransactionByMonthQuery } from "../../slices/api/transaction/TransactionApi";

const BarChartDataHandler = (year, bankId) => {
  const { data: monthlyTransaction } = useGetTransactionByMonthQuery({
    year,
    bankId,
  });

  return { monthlyTransaction };
};

export default BarChartDataHandler;
