import { Component, useEffect, useState } from "react";
import AccordianModel from "../../../const/widget_component_model/components/AccordianModel";
import { FaPlus } from "react-icons/fa6";
import TransactionDataHandler from "../../../behindTheScene/helper/TransactionDataHandler";
import PropTypes from "prop-types";
import { IoChevronBack } from "react-icons/io5";

export default function Activites({ selectedPlatform }) {
  const { bankdepositHistory } = TransactionDataHandler(selectedPlatform);

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
    const newData = bankdepositHistory.entities.map((deposit) => {
      const store = {
        source: deposit.source.toLowerCase().trim(" "),
        amount: deposit.amount,
      };
      return store;
    });

    const sorted = newData.sort((a, b) => (a.amount > b.amount ? -1 : 1));
    sorted.length = 5;

    const getFreq = sorted.reduce((acc, current) => {
      if (!acc[current.source]) {
        acc[current.source] = 1;
      } else {
        acc[current.source]++;
      }
      return acc;
    }, {});

    setOftenDepositsData(sorted);
  }, [bankdepositHistory]);

  if (incomeModal)
    return (
      <main className=" w-full h-20 flex justify-center items-center  bg-white ">
        <header className="d-flex align-items-center">
          <IoChevronBack onClick={() => setIncomeModal(false)} />
          <article className="text-black text-lg ml-2">Income tracker</article>
        </header>

        <form className="mt-2 d-flex flex-column">
          <div className="form-group">
            <label>Income Source</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input type="number" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </main>
    );

  if (expenseModal)
    return (
      <main className=" w-full h-20 flex justify-center items-center  bg-white ">
        <header className="d-flex align-items-center">
          <IoChevronBack onClick={() => setexpenseModal(false)} />
          <article className="text-black text-lg ml-2">Expense tracker</article>
        </header>

        <form className="mt-2 d-flex flex-column">
          <div className="form-group">
            <label>Expense Source</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input type="text" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </main>
    );

  return (
    <ActivitiesWrapped
      getOftenDepositsData={getOftenDepositsData}
      selectedItems={selectedItems}
      handleCheckboxChangefunc={handleCheckboxChange}
      setIncomeModal={setIncomeModal}
      setexpenseModal={setexpenseModal}
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
    setIncomeModal: PropTypes.func,
    setexpenseModal: PropTypes.func,
  };
  render() {
    const {
      getOftenDepositsData,
      handleCheckboxChangefunc,
      selectedItems,
      setIncomeModal,
      setexpenseModal,
    } = this.props;

    return (
      <main className="d-flex flex-column w-100">
        <header className="text-lg">Activity tracker</header>

        <div
          style={{
            height: "500px",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
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
                  <button
                    className="btn btn-light"
                    onClick={() => setIncomeModal(true)}
                  >
                    Add other source
                  </button>
                </div>
              </div>
            </AccordianModel>
          </section>

          <section className="mt-3">
            <AccordianModel title="Expense Source">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <FaPlus />
                  <button
                    className="btn btn-light"
                    onClick={() => setexpenseModal(true)}
                  >
                    Add other source
                  </button>
                </div>
              </div>
            </AccordianModel>
          </section>
        </div>
        <button className="btn btn-primary">save changes</button>
      </main>
    );
  }
}
