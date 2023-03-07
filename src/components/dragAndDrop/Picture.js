import React from "react";
import { useDrag } from "react-dnd";
import "../App.css";

function Picture({ id, url }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item:{id:id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={url}
      alt=""
      width="150px"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    />
  );
}

export default Picture;
