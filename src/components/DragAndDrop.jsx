import React, { useState } from "react";
import "./dragAndDropHomeCss.css";
const internalDNDType = "somecode";

function DragAndDropHome() {
  const hostName = process.env.REACT_APP_HOSTNAME_ENDPOINT;
  let abc = [];
  const [fruits, setFruits] = useState([]);
  const [prefered, setPrefered] = useState([]);

  const onDrag = (event) => {
    if (event.target instanceof HTMLLIElement) {
      console.log("event", event);
      const current = event.target.dataset.value;
      event.dataTransfer.setData(internalDNDType, current);
      event.dataTransfer.effectAllowed = "move"; // only allow moves
    } else {
      event.preventDefault(); // don't allow selection to be dragged
    }
  };

  const dragEnterHandler = (event) => {
    console.log(event);
    const item = event.dataTransfer.items && event.dataTransfer.items[0];
    if (item.type === internalDNDType) {
      event.preventDefault();
      return;
    }
  };
  const dragOverHandler = (event) => {
    console.log(event);
    event.dataTransfer.dropEffect = "move";
    event.preventDefault();
  };
  //! below is drop
  const dropHandler = (event, drop = false) => {
    console.log(internalDNDType);
    var data = event.dataTransfer.getData(internalDNDType);
    const newPrefered = [...prefered];
    console.log(data);
    if (!drop) {
      // Add
      // const item = JSON.parse(data);
      newPrefered.push(Object.entries(data[0]));
      setPrefered(newPrefered);
      console.log(newPrefered);
    } else if (drop) {
      // Delete
      setPrefered(newPrefered.filter((f) => f !== data));
    }
  };
  //--------------------------------------------
  //!get image as a ..... from API
  const getDuties = async () => {
    try {
      const response = await fetch(hostName + "/api/v1/ros/actions");
      const data = await response.json();
      // console.log(data.data.Actions);
      setFruits(data.data.Actions);

      abc = data;
      // console.log(abc);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(fruits);
  console.log(prefered);
  return (
    <div className="App">
      <div>
        <button onClick={getDuties}>Duties</button>
        <p>What is the duty?</p>
        <ol
          className="moveable"
          onDragStart={onDrag}
          style={{
            border: "2px solid black",
            gap: "50px",
            width: "400px",
            height: "500px",
          }}
        >
          {fruits?.map((fruit, index) => (
            <li
              key={fruit + index}
              draggable="true"
              data-value={fruit}
              style={{ padding: "20px", border: "2px solid green" }}
            >
              {fruit.name}
            </li>
          ))}
        </ol>
      </div>
      <hr />
      <div>
        <p>Add your duties below sort of preview:</p>
        {
          <div
            onDragEnter={dragEnterHandler}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
            onDragStart={onDrag}
            className="moveable square"
            style={{
              width: "400px",
              height: "500px",
              border: "2px solid blue",
            }}
          >
            {prefered.length ? (
              <ul>
                {prefered?.map((fruit, index) => (
                  <li
                    key={fruit + index}
                    draggable="true"
                    data-value={fruit}
                    style={{ padding: "20px", border: "2px solid green" }}
                  >
                    {fruit._id}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Duty is chosen drop in here!</div>
            )}
          </div>
        }
      </div>
      <hr />
      <div
        onDragEnter={dragEnterHandler}
        onDragOver={dragOverHandler}
        onDrop={(e) => dropHandler(e, true)}
        style={{ padding: "20px", border: "2px solid red" }}
      >
        Want to delete some tasks ? Throw it here !
      </div>
    </div>
  );
}

export default DragAndDropHome;
