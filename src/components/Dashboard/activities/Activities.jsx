import { Component, useEffect, useState } from "react";
import AccordianModel from "../../../const/widget_component_model/components/AccordianModel";
import { FaPlus } from "react-icons/fa6";
import PropTypes from "prop-types";
import { IoChevronBack } from "react-icons/io5";
import TransactionDataHandler from "../../../behindTheScene/helper/TransactionDataHandler";
import LocalData from "../../../behindTheScene/helper/LocalData";
import IncomeGenerator from "./IncomeGenerator";
import EditIncomeGenerator from "./EditIncomeGenerator";
import DisplayIncomeSource from "./DisplayIncomeSource";

export default function Activites({ selectedPlatform }) {
  const { bankdepositHistory } = TransactionDataHandler(selectedPlatform);

  const getIncomeSource = LocalData.getStorageData("incomesource");
  // const activeIncomeSource = localeData.getStorageData();
  const [getOftenDepositsData, setOftenDepositsData] = useState([]);

  const [getWeeklyIncomeSource, setWeeklyIncomeSource] = useState([]);
  const [getHourlyIncomeSource, setHourlyIncomeSource] = useState([]);
  const [getMonthlyIncomeSource, setMonthlyIncomeSource] = useState([]);
  const [getyearlyIncomeSource, setYearlyIncomeSource] = useState([]);

  const [editSelectedSource, setEditSelectedSource] = useState(false);

  const [incomeModal, setIncomeModal] = useState(false);
  const [expenseModal, setexpenseModal] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  const [formData, setFormData] = useState({
    source: "",
    amount: 0,
    duration: "",
  });

  const createNewIncomesource = (e) => {
    e.preventDefault();
    let newData = [];
    newData.push(formData);
    LocalData.storeData("incomesource", newData);
  };

  const editSource = (source) => {
    setEditSelectedSource(true);
    setFormData({
      source: source.source,
      amount: source.amount,
      duration: source.duration,
    });
  };

  const saveChanges = () => {
    console.log(selectedItems);

    if (getIncomeSource.length > 0) {
      const getsource = getIncomeSource.filter(
        (data, i) => data.source === selectedItems[i]
      );
      console.log(getsource);
    }
    console.log(getIncomeSource);
    console.log(getOftenDepositsData);
    if (getOftenDepositsData.length > 0) {
      const getOftenSource = getOftenDepositsData.filter(
        (data, i) => data.source === selectedItems[i]
      );

      console.log(getOftenSource);
    }
  };

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
          duration: "monthly",
        };
        return store;
      });

      const sorted = newData?.sort((a, b) => (a.amount > b.amount ? -1 : 1));
      sorted.length = 5;

      LocalData.storeData("oftenIncomeSource", sorted);

      setOftenDepositsData(sorted);
    }

    if (getIncomeSource) {
      const weekly = getIncomeSource.filter(
        (data) => data.duration === "weekly"
      );
      setWeeklyIncomeSource(weekly);

      const hourly = getIncomeSource.filter(
        (data) => data.duration === "hourly"
      );
      setHourlyIncomeSource(hourly);
      const monthly = getIncomeSource.filter(
        (data) => data.duration === "monthly"
      );
      setMonthlyIncomeSource(monthly);
      const yearly = getIncomeSource.filter(
        (data) => data.duration === "yearly"
      );
      setYearlyIncomeSource(yearly);
    }
  }, [bankdepositHistory]);

  if (incomeModal)
    return (
      <IncomeGenerator
        setIncomeModal={setIncomeModal}
        formData={formData}
        setFormData={setFormData}
        createNewIncomesource={createNewIncomesource}
      />
    );

  if (editSelectedSource)
    return (
      <EditIncomeGenerator
        setEditSelectedSource={setEditSelectedSource}
        formData={formData}
        setFormData={setFormData}
        getOftenDepositsData={getOftenDepositsData}
        setOftenDepositsData={setOftenDepositsData}
      />
    );

  if (expenseModal)
    return (
      <main className=" w-full h-20 flex justify-center items-center  bg-white ">
        <header className="d-flex align-items-center">
          <IoChevronBack onClick={() => setexpenseModal(false)} />
          <article className="text-black text-md ml-3">
            Every month expense generator
          </article>
        </header>

        <form className="mt-4 d-flex flex-column">
          <div className="form-group">
            <label>Expense Source</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input type="text" className="form-control" />
          </div>

          <button type="submit" className="btn mt-2 btn-primary">
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
      editSource={editSource}
      weeklyIncome={getWeeklyIncomeSource}
      hourlyIncome={getHourlyIncomeSource}
      monthlyIncome={getMonthlyIncomeSource}
      yearlyIncome={getyearlyIncomeSource}
      saveChanges={saveChanges}
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
    editSource: PropTypes.func,
  };
  render() {
    const {
      getOftenDepositsData,
      handleCheckboxChangefunc,
      selectedItems,
      setIncomeModal,
      setexpenseModal,
      editSource,
      weeklyIncome,
      hourlyIncome,
      monthlyIncome,
      yearlyIncome,
      saveChanges,
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
                  <header>Currently Active Income Source </header>
                  {weeklyIncome &&
                    weeklyIncome?.map((data, i) => (
                      <div key={data.source + i}>
                        <DisplayIncomeSource
                          data={data}
                          editSource={editSource}
                          handleCheckboxChangefunc={handleCheckboxChangefunc}
                          selectedItems={selectedItems}
                        />
                      </div>
                    ))}
                </div>
                <hr />

                {weeklyIncome.length > 0 && (
                  <div className="mb-2">
                    <header>Weekly Income </header>
                    {weeklyIncome &&
                      weeklyIncome?.map((data, i) => (
                        <div key={data.source + i}>
                          <DisplayIncomeSource
                            data={data}
                            editSource={editSource}
                            handleCheckboxChangefunc={handleCheckboxChangefunc}
                            selectedItems={selectedItems}
                          />
                        </div>
                      ))}
                    <hr />
                  </div>
                )}

                {hourlyIncome.length > 0 && (
                  <div className="mb-2">
                    <header>Hourly Income </header>
                    {hourlyIncome &&
                      hourlyIncome?.map((data, i) => (
                        <div key={data.source + i}>
                          <DisplayIncomeSource
                            data={data}
                            editSource={editSource}
                            handleCheckboxChangefunc={handleCheckboxChangefunc}
                            selectedItems={selectedItems}
                          />
                        </div>
                      ))}
                    <hr />
                  </div>
                )}

                {monthlyIncome.length > 0 && (
                  <div className="mb-2">
                    <header>Monthly Income </header>
                    {monthlyIncome &&
                      monthlyIncome?.map((data, i) => (
                        <div key={data.source + i}>
                          <DisplayIncomeSource
                            data={data}
                            editSource={editSource}
                            handleCheckboxChangefunc={handleCheckboxChangefunc}
                            selectedItems={selectedItems}
                          />
                        </div>
                      ))}
                    <hr />
                  </div>
                )}

                {yearlyIncome.length > 0 && (
                  <div className="mb-2">
                    <header>yearly Income </header>
                    {yearlyIncome &&
                      yearlyIncome?.map((data, i) => (
                        <div key={data.source + i}>
                          <DisplayIncomeSource
                            data={data}
                            editSource={editSource}
                            handleCheckboxChangefunc={handleCheckboxChangefunc}
                            selectedItems={selectedItems}
                          />
                        </div>
                      ))}
                    <hr />
                  </div>
                )}

                <div className="mb-2">
                  {getOftenDepositsData.length > 0 && (
                    <header>Highest Income Source</header>
                  )}
                  {getOftenDepositsData &&
                    getOftenDepositsData?.map((data, i) => (
                      <div
                        key={data.source + i}
                        className="mt-2 d-flex justify-content-between mr-2"
                      >
                        <input
                          type="checkbox"
                          name={data.source}
                          checked={selectedItems.includes(data.source)}
                          onChange={handleCheckboxChangefunc}
                        />
                        <label
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => editSource(data)}
                        >
                          {data.source}
                        </label>

                        <label>{data.amount}</label>
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
        <button className="btn btn-primary" onClick={saveChanges}>
          save changes
        </button>
      </main>
    );
  }
}
