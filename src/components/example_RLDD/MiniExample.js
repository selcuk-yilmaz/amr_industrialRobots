import React from "react";
import { useDrag } from "react-dnd";
const MiniExample = ({ id, title, body, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="item">
      <p className="title">{title}</p>
      <p className="body">{body}</p>
      <div className="small">
        item.id: {id} - index: {index}
      </div>
    </div>
  );
};

export default MiniExample;
