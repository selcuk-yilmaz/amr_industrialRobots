import React, { useEffect, useState } from "react";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import bananas from "./bananas.json";
import "../../index.css";
import MiniExample from "./MiniExample";
import axios from "axios";
import { useDrop } from "react-dnd";


export default function Example() {
  const hostName = process.env.REACT_APP_HOSTNAME_ENDPOINT;
  const [items, setItems] = useState(bananas.bananas);
  const [getAllDuties, setGetAllDuties] = useState(null);
 const [toGoTasks, setToGoTasks] = useState(null);

 useEffect(() => {
 getDuties()
 }, [])
 
//!--below is belonging component
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
  //--------------------------------------------
  //!get image as a ..... from API
  const getDuties = async () => {
    try {
      const response = await fetch(hostName + "/api/v1/ros/actions");
      const data = await response.json();
      console.log(data.data.Actions);
      setGetAllDuties(data.data.Actions);

    } catch (error) {
      console.error(error);
    }
  };
  //-------------------------------------------------------
  //!post image as a object toward API  ***
  const postDuties = async () => {
    const deta = {
      imageBase64: toGoTasks,
    };
    await sentMap(deta);
    console.log(deta.imageBase64);
  };

  const sentMap = async (imageBase64) => {
    try {
      let result = await axios.post(
        hostName + "/api/v1/ros/actions",
        imageBase64
      );
      console.log(result);
      alert("map was updated and sent");
    } catch (error) {
      console.log(error);
    }
  };
  //-----------------------------------------------------
      const [board, setBoard] = useState([]);
      const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }));
      const addImageToBoard = (id) => {
        // console.log(id);
        const pictureList = getAllDuties.filter((picture) => id === picture._id);
        setBoard((board) => [...board, pictureList[0]]); //! board a çoklu ekleme yapmak için
        // setBoard([pictureList[0]]); //! board a tek bir şey ekleme yapmak için
      };
  console.log(getAllDuties);
  return (
    <>
      <div className="react_list_container">
        <div className="react_list_board">
          <h1>react-list-drag-and-drop</h1>
          <p>
            <a href="https://www.npmjs.com/package/react-list-drag-and-drop">
              <img
                alt="npm install react-list-drag-and-drop"
                src="https://nodei.co/npm/react-list-drag-and-drop.png?mini=true"
              />
            </a>
          </p>
          <h2>Javascript Example 1: Draggable List of Bananas</h2>
          <p>Drag and drop items to re-order the list.</p>
          <RLDD
            cssClasses="example"
            items={items}
            itemRenderer={itemRenderer}
            onChange={handleRLDDChange}
          />
        </div>
        <div className="react_list_choose">
          <div
            style={{ width: "25vw", height: "100vh", border: "2px solid red" }}
          >
            {getAllDuties?.map((duty, index) => {
              return (
                <MiniExample
                  key={duty._id}
                  id={duty._id}
                  title={duty.name}
                  body={duty.type}
                  index={index}
                />
              );
            })}
          </div>
          <div
            style={{ width: "25vw", height: "100vh", border: "2px solid red" }}
            className="Board"
            ref={drop}
          >
            {board?.map((duty, index) => {
              return (
                <MiniExample
                  key={index}
                  id={duty._id}
                  title={duty.name}
                  body={duty.type}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
