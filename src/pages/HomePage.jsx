import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Item,
  Clone,
  Handle,
  Kiosk,
  Container,
  Notice,
  Content,
  Button,
  postMission,
} from "./DragDrop.styled";
import axios from "axios";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const list_id = uuid();

const App = () => {
  const hostName = "http://127.0.0.1:5050";
  const [list, setList] = useState({
    [list_id]: [],
  });
  const [actions, setActions] = useState([]);

  useEffect(() => {
    getActions();
  }, []);
  //!-------------get actions------------
  const getActions = async () => {
    fetch("http://127.0.0.1:5050/api/v1/ros/actions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.Actions);
        setActions(data.data.Actions);
      });
  };
  //!-------------post actions------------
  const postAction = async () => {
    const data = {
      mission: list,
      name: Math.floor(Math.random() * 10000 + 1),
    };
    await sentMap(data);
    console.log(data.mission);
  };

  const sentMap = async (data) => {
    try {
      let result = await axios.post(hostName + "/api/v1/ros/missions", data);
      console.log(result);
      alert("missions was stored and sent");
    } catch (error) {
      console.log(error);
    }
  };

  //!------------copmponent's---------------
  // const onDragEnd = (result) => {
  //   const { source, destination } = result;

  //   // dropped outside the list
  //   if (!destination) {
  //     return;
  //   }

  //   switch (source.droppableId) {
  //     case destination.droppableId:
  //       setList((prevState) => ({
  //         ...prevState,
  //         [destination.droppableId]: reorder(
  //           list[source.droppableId],
  //           source.index,
  //           destination.index
  //         ),
  //       }));
  //       break;
  //     case "ACTIONS":
  //       setList((prevState) => ({
  //         ...prevState,
  //         [destination.droppableId]: copy(
  //           actions,
  //           prevState[destination.droppableId],
  //           source,
  //           destination
  //         ),
  //       }));
  //       break;
  //     default:
  //       setList((prevState) => ({
  //         ...prevState,
  //         ...move(
  //           prevState[source.droppableId],
  //           prevState[destination.droppableId],
  //           source,
  //           destination
  //         ),
  //       }));
  //       break;
  //   }
  // };
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      setList((prevState) => ({
        ...prevState,
        [destination.droppableId]: reorder(
          list[source.droppableId],
          source.index,
          destination.index
        ),
      }));
    } else if (source.droppableId === "ACTIONS") {
      setList((prevState) => ({
        ...prevState,
        [destination.droppableId]: copy(
          actions,
          prevState[destination.droppableId],
          source,
          destination
        ),
      }));
    } else {
      setList((prevState) => ({
        ...prevState,
        ...move(
          prevState[source.droppableId],
          prevState[destination.droppableId],
          source,
          destination
        ),
      }));
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  console.log(list);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ACTIONS" isDropDisabled={true}>
        {(provided, snapshot) => (
          <Kiosk
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {actions.map((item, index) => (
              <Draggable key={item._id} draggableId={item._id} index={index}>
                {(provided, snapshot) => (
                  <React.Fragment>
                    <Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      style={provided.draggableProps.style}
                    >
                      {item.name}
                    </Item>
                    {snapshot.isDragging && <Clone>{item.name}</Clone>}
                  </React.Fragment>
                )}
              </Draggable>
            ))}
          </Kiosk>
        )}
      </Droppable>

      <Content>
        <Droppable key={list_id} droppableId={list_id}>
          {(provided, snapshot) => (
            <Container
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {list[list_id] ? (
                list[list_id]?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Item
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        isDragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                      >
                        <Handle {...provided.dragHandleProps}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                            />
                          </svg>
                        </Handle>
                        {item.name}
                        <button
                          style={{ color: "red", border: "none" }}
                          type="button"
                          onClick={() => {
                            const newList = [...list[list_id]];
                            newList.splice(index, 1);
                            setList({
                              ...list,
                              [list_id]: newList,
                            });
                          }}
                        >
                          🗑️
                        </button>
                      </Item>
                    )}
                  </Draggable>
                ))
              ) : (
                <Notice>Drop ACTIONS HERE</Notice>
              )}
              <postMission>
                <Button
                  style={{ position: "absolute", bottom: "0" }}
                  onClick={postAction}
                >
                  Post Missions
                </Button>
              </postMission>
            </Container>
          )}
        </Droppable>
      </Content>
    </DragDropContext>
  );
};
export default App;
