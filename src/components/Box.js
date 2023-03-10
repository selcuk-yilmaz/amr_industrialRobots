import React from "react";
import { useDrag } from "react-dnd";

const Box = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id: id, type: "BOX" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        backgroundColor: "#eee",
        border: "1px dashed grey",
        padding: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      {text}
    </div>
  );
};

export default Box;
