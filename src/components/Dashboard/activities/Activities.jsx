import { Component, useEffect, useState } from "react";
import AccordianModel from "../../../const/widget_component_model/components/AccordianModel";
import { FaPlus } from "react-icons/fa6";
import TransactionDataHandler from "../../../behindTheScene/helper/TransactionDataHandler";
import PropTypes from "prop-types";

export default function Activites({ selectedPlatform }) {
  const {
    depositsSource,
    withdrawSource,
    bankdepositHistory,
    userbankDepositsData,
  } = TransactionDataHandler(selectedPlatform);

  const [getOftenDepositsData, setOftenDepositsData] = useState([]);
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
    const newData = bankdepositHistory.entities.map((deposit) => {
      const store = {
        source: deposit.source.toLowerCase().trim(" "),
        amount: deposit.amount,
      };
      return store;
    });

    const sorted = newData.sort((a, b) => (a.amount > b.amount ? -1 : 1));
    sorted.length = 5;
    const getFreq = newData.reduce((acc, current) => {
      if (!acc[current.source]) {
        acc[current.source] = 1;
      } else {
        acc[current.source]++;
      }
      return acc;
    }, {});

    setOftenDepositsData(sorted);
  }, [bankdepositHistory]);

  return (
    <ActivitiesWrapped
      getOftenDepositsData={getOftenDepositsData}
      selectedItems={selectedItems}
      handleCheckboxChangefunc={handleCheckboxChange}
    />
  );
}

Activites.propTypes = {
  selectedPlatform: PropTypes.object,
};

class ActivitiesWrapped extends Component {
  static propTypes = {
    getOftenDepositsData: PropTypes.array,
    handleCheckboxChangefunc: PropTypes.func,
    selectedItems: PropTypes.array,
  };
  render() {
    const { getOftenDepositsData, handleCheckboxChangefunc, selectedItems } =
      this.props;

    return (
      <main className="d-flex flex-column w-100">
        <header className="text-lg">Activity tracker</header>

        <section className="mt-3">
          <AccordianModel title="Income Source">
            <div className="d-flex flex-column">
              <div className="mb-2">
                <header>Highest Income Source</header>
                {getOftenDepositsData &&
                  getOftenDepositsData?.map((data, i) => (
                    <div key={data.source + i} className="mt-2">
                      <label className="d-flex justify-content-between">
                        <input
                          type="checkbox"
                          name={data.source}
                          checked={selectedItems.includes(data.source)}
                          onChange={handleCheckboxChangefunc}
                        />
                        {data.source}
                      </label>
                    </div>
                  ))}
              </div>

              <div className="d-flex align-items-center ">
                <FaPlus />
                <button className="btn btn-light">Add other source</button>
              </div>
            </div>
          </AccordianModel>
        </section>

        <section className="mt-3">
          <AccordianModel title="Expense Source">
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <FaPlus />
                <button className="btn btn-light">Add other source</button>
              </div>
            </div>
          </AccordianModel>
        </section>
      </main>
    );
  }
}
