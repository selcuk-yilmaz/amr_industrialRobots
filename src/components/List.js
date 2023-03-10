import React, { useState } from "react";
import List from "react-list-drag-and-drop";

const DragAndDropList = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const handleDrop = (fromList, toList, item, index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>
      <List
        items={items}
        onChange={setItems}
        onDrop={handleDrop}
        dropStyle={{ backgroundColor: "lightgrey" }}
        handleStyle={{ backgroundColor: "grey" }}
      />
    </div>
  );
};

export default DragAndDropList;
