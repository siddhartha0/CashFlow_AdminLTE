import { IoChevronBack } from "react-icons/io5";
import duration from "./Duration";

export default function IncomeGenerator({
  setIncomeModal,
  formData,
  setFormData,
  createNewIncomesource,
}) {
  const handleEditSource = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <main className=" w-full h-20 flex justify-center items-center  bg-white ">
      <header className="d-flex align-items-center">
        <IoChevronBack onClick={() => setIncomeModal(false)} />
        <article className="text-black text-md ml-3">
          Every month income generator
        </article>
      </header>

      <form
        className="mt-4 d-flex flex-column"
        onSubmit={createNewIncomesource}
      >
        <div className="form-group">
          <label>Income Source</label>
          <input
            type="text"
            className="form-control"
            name="source"
            value={formData.source}
            onChange={handleEditSource}
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={formData.amount}
            onChange={handleEditSource}
          />
        </div>
        <div className="form-group d-flex flex-column">
          <label>Select the income frequency</label>
          <select
            value={formData.duration}
            name="duration"
            className="form-control"
            onChange={handleEditSource}
          >
            {duration.map((date) => (
              <option value={date.duration} key={date.id + date.duration}>
                {date.duration}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn  mt-3 btn-primary">
          Create
        </button>
      </form>
    </main>
  );
}
