import React, { useState } from "react";
import { useDrag } from "react-dnd";
import "../../App.css";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

function Board({ id, url }) {
     const [items, setItems] = useState();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const itemRenderer = (item, index) => {
    return (
      <div className="item">
        <p className="title">{item.title}</p>
        <p className="body">{item.body}</p>
        <div className="small">
          item.id: {item.id} - index: {index}
        </div>
      </div>
    );
  };

  const handleRLDDChange = (reorderedItems) => {
    setItems(reorderedItems);
  };
  return (
    <div>
      <RLDD
        cssClasses="example"
        items={url}
        itemRenderer={itemRenderer}
        onChange={handleRLDDChange}
      />
    </div>
  );
}

export default Board;
