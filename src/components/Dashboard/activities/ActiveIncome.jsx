import { useDrop } from "react-dnd";

function ActiveIncome({ onDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        border: `1px dashed ${isOver ? "green" : "black"}`,
        padding: "10px",
      }}
    >
      Drop here
    </div>
  );
}

export default ActiveIncome;
