import { useDrag } from "react-dnd";

function ActivityDragger({ source, amount, duration, type }) {
  const item = {
    source: source,
    amount: amount,
    duration: duration,
    type: type,
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        margin: "5px",
        backgroundColor: "lightblue",
      }}
    >
      {source}
    </div>
  );
}

export default ActivityDragger;
