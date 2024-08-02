import { useEffect, useState } from "react";
import LocalData from "../../behindTheScene/helper/LocalData";

function useCalanderData() {
  const [data, setData] = useState();
  useEffect(() => {
    const calanderData = LocalData.getStorageData("calenderData");

    let currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    if (calanderData) {
      let toMap = [];
      calanderData.forEach((data) => {
        for (let i = 0; i < 12; i++) {
          let months = currentMonth + i;
          if (months > 12) {
            break;
          }
          const newData = {
            title: data.source,
            amount: data.amount,
            duration: data.duration,
            type: data.type,
            start: new Date(currentYear, months, data.time),
            end: new Date(currentYear, months, data.time),
          };
          toMap.push(newData);
        }
      });
      setData(toMap);
    }
  }, []);

  return { data };
}

export default useCalanderData;
