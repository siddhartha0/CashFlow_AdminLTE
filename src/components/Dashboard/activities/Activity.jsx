import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ActivityDragger from "./ActivityDragger";
import ActiveIncome from "./ActiveIncome";
import { useEffect, useState } from "react";
import AccordianModel from "../../../const/widget_component_model/components/AccordianModel";
import LocalData from "../../../behindTheScene/helper/LocalData";
import TransactionDataHandler from "../../../behindTheScene/helper/TransactionDataHandler";
import { FaPlus } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";
import EditIncomeGenerator from "./EditIncomeGenerator";
import IncomeGenerator from "./IncomeGenerator";

export default function Activity({ selectedPlatform }) {
  const { bankdepositHistory } = TransactionDataHandler(selectedPlatform);

  const getIncomeSource = LocalData.getStorageData("incomesource");

  const [getOftenDepositsData, setOftenDepositsData] = useState([]);

  const [getWeeklyIncomeSource, setWeeklyIncomeSource] = useState([]);
  const [getHourlyIncomeSource, setHourlyIncomeSource] = useState([]);
  const [getMonthlyIncomeSource, setMonthlyIncomeSource] = useState([]);
  const [getyearlyIncomeSource, setYearlyIncomeSource] = useState([]);

  const [editSelectedSource, setEditSelectedSource] = useState(false);

  const [incomeModal, setIncomeModal] = useState(false);
  const [expenseModal, setexpenseModal] = useState(false);

  const [droppedItems, setDroppedItems] = useState(
    LocalData.getStorageData("calenderData") || []
  );

  const handleDrop = (item) => {
    console.log(item);
    setDroppedItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...droppedItems];
    updatedItems.splice(index, 1);
    setDroppedItems(updatedItems);
  };

  const [formData, setFormData] = useState({
    source: "",
    amount: 0,
    duration: "",
    type: "deposit",
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
      type: source.type,
    });
  };

  const saveChanges = () => {
    const forCalander = droppedItems.map((item, i) => {
      let forCalander = {
        source: item.source,
        amount: item.amount,
        duration: item.duration,
        type: item.type,
      };
      if (item.duration === "monthly") {
        forCalander.time = i + 1;
      }
      return forCalander;
    });
    LocalData.storeData("calenderData", forCalander);
  };

  useEffect(() => {
    if (bankdepositHistory) {
      const newData = bankdepositHistory?.entities?.map((deposit) => {
        const store = {
          source: deposit.source.toLowerCase(),
          amount: deposit.amount,
          duration: "monthly",
          type: "deposit",
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
    <DndProvider backend={HTML5Backend}>
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
                  <div
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <h2>Active Income Source</h2>
                    <ActiveIncome onDrop={handleDrop} />
                    {droppedItems.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          border: "1px solid #ccc",
                          padding: "10px",
                          borderRadius: "5px",
                          marginTop: "10px",
                          backgroundColor: "lightblue",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <p>{item.source}</p>
                        <button onClick={() => handleRemoveItem(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <hr />

                {getWeeklyIncomeSource.length > 0 && (
                  <div className="mb-2">
                    <header>Weekly Income </header>
                    {getWeeklyIncomeSource &&
                      getWeeklyIncomeSource?.map((data, i) => (
                        <div key={data.source + i}>
                          <ActivityDragger
                            source={data.source}
                            amount={data.amount}
                            duration={data.duration}
                            type={data.type}
                          />
                        </div>
                      ))}
                    <hr />
                  </div>
                )}

                {getHourlyIncomeSource.length > 0 && (
                  <div className="mb-2">
                    <header>Hourly Income </header>
                    {getHourlyIncomeSource &&
                      getHourlyIncomeSource?.map((data, i) => (
                        <div key={data.source + i}>
                          <ActivityDragger
                            source={data.source}
                            amount={data.amount}
                            duration={data.duration}
                            type={data.type}
                          />
                        </div>
                      ))}
                    <hr />
                  </div>
                )}

                {getMonthlyIncomeSource.length > 0 && (
                  <div className="mb-2">
                    <header>Monthly Income </header>
                    {getMonthlyIncomeSource &&
                      getMonthlyIncomeSource?.map((data, i) => (
                        <div
                          key={data.source + i}
                          onClick={() => editSource(data)}
                        >
                          <ActivityDragger
                            source={data.source}
                            amount={data.amount}
                            duration={data.duration}
                            type={data.type}
                          />
                        </div>
                      ))}
                    <hr />
                  </div>
                )}

                {getyearlyIncomeSource.length > 0 && (
                  <div className="mb-2">
                    <header>yearly Income </header>
                    {getyearlyIncomeSource &&
                      getyearlyIncomeSource?.map((data, i) => (
                        <div key={data.source + i}>
                          <ActivityDragger
                            source={data.source}
                            amount={data.amount}
                            duration={data.duration}
                            type={data.type}
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
                        onClick={() => editSource(data)}
                      >
                        <ActivityDragger
                          source={data.source}
                          amount={data.amount}
                          duration={data.duration}
                          type={data.type}
                        />
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
        <button className="btn btn-primary" onClick={() => saveChanges()}>
          save changes
        </button>
      </main>
    </DndProvider>
  );
}
