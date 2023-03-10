import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [items, setItems] = useState(["item 1", "item 2", "item 3"]);
  const [leftItems, setLeftItems] = useState(items);
  const [rightItems, setRightItems] = useState([]);

const handleDragEnd = (result) => {
  const { source, destination } = result;

  // If the item was dropped outside of any droppable area, return early
  if (!destination) {
    return;
  }

  // If the item was dropped in the same droppable area and in the same position, return early
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  // Remove the dragged item from the source column
  const sourceItems = source.droppableId === "left" ? leftItems : rightItems;
  const draggedItem = sourceItems[source.index];
  const newSourceItems = [...sourceItems];
  newSourceItems.splice(source.index, 1);

  // Add the dragged item to the destination column
  const destinationItems = rightItems;
  const newDestinationItems = [...destinationItems];
  newDestinationItems.splice(destination.index, 0, draggedItem);

  // Update the state with the new items
  setLeftItems(newSourceItems);
  setRightItems(newDestinationItems);
};


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <Droppable droppableId="left">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ width: "50%", border: "2px solid blue" }}
            >
              <h3>Column 1</h3>
              {leftItems.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: "red",
                        color: "#444",
                        borderRadius: "4px",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="right">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ width: "50%", border: "2px solid black" }}
            >
              <h3>Column 2</h3>
              {rightItems.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: snapshot.isDragging ? "blue" : "green",
                        color: "#444",
                        borderRadius: "4px",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;

