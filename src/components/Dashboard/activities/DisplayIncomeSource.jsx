export default function DisplayIncomeSource({
  data,
  selectedItems,
  handleCheckboxChangefunc,
  editSource,
}) {
  return (
    <div className="mt-2 d-flex justify-content-between mr-2">
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
  );
}
