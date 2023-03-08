import React from "react";
import { useDrag } from "react-dnd";
import "../../App.css";
// import RLDD from "react-list-drag-and-drop/lib/RLDD";
function Picture({ id, url }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      width="150px"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    >
      <p style={{ border: "5px solid pink"  }}>{url}</p>
      {/* <RLDD
        cssClasses="example"
        items={url}
        // itemRenderer={itemRenderer}
        // onChange={handleRLDDChange}
      /> */}
    </div>
  );
}

export default Picture;
