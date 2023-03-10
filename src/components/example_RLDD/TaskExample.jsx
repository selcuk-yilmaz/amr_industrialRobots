import React, { useState } from "react";
import { useDrag } from "react-dnd";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

const TaskExample = ({ id, title, body, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
   const [items, setItems] = useState([title]);
  //!--below is belonging RLDD component
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
  //--------------------------------------------------------
  console.log(title);
  return (
    <>
      {/* <div ref={drag} className="item">
        <p className="title">{title}</p>
        <p className="body">{body}</p>
        <div className="small">
          item.id: {id} - index: {index}
        </div>
      </div> */}
      <div ref={drag} className="item">
        <RLDD
          cssClasses="example"
          items={items}
          itemRenderer={itemRenderer}
          onChange={handleRLDDChange}
        />
      </div>
    </>
  );
};

export default TaskExample;
