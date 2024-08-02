import { useEffect, useState } from "react";

const ActivityTrackerLocalData = ({ bankdepositHistory }) => {
  console.log(bankdepositHistory);
  const [getOftenDepositsData, setOftenDepositsData] = useState([]);

  const [incomeModal, setIncomeModal] = useState(false);
  const [expenseModal, setexpenseModal] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelectedItems([...selectedItems, name]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    if (bankdepositHistory) {
      const newData = bankdepositHistory?.entities?.map((deposit) => {
        const store = {
          source: deposit.source.toLowerCase(),
          amount: deposit.amount,
        };
        return store;
      });

      const sorted = newData?.sort((a, b) => (a.amount > b.amount ? -1 : 1));
      sorted.length = 5;

      //   const getFreq = sorted?.reduce((acc, current) => {
      //     if (!acc[current.source]) {
      //       acc[current.source] = 1;
      //     } else {
      //       acc[current.source]++;
      //     }
      //     return acc;
      //   }, {});
      console.log(sorted);

      setOftenDepositsData(sorted);
    }
  }, [bankdepositHistory]);

  return {
    incomeModal,
    setIncomeModal,
    expenseModal,
    setexpenseModal,
    getOftenDepositsData,
    selectedItems,
    handleCheckboxChange,
  };
};

export default ActivityTrackerLocalData;
