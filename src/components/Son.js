import React, { useEffect, useState } from "react";
import "../index.css";
import SonSbling from "./SonSbling";
import axios from "axios";
import { useDrop } from "react-dnd";

export default function Example() {
  const hostName = process.env.REACT_APP_HOSTNAME_ENDPOINT;
  const [items, setItems] = useState();
  const [getAllDuties, setGetAllDuties] = useState([]);
  const [toGoTasks, setToGoTasks] = useState(null);
  const [board, setBoard] = useState([]);
  let abc = [];
  //!--below is belonging dnd component
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    console.log(id);
    console.log(getAllDuties);
    console.log("ali");
    const dutyList = abc?.filter((duty) => id === duty._id);
    setBoard((board) => [...board, dutyList[0]]);
  };
  useEffect(() => {
    // getDuties();
    getTasks();
  }, []);
  //----------------------------------------------------

  //--------------------------------------------
  //!get image as a ..... from API
  // const getDuties = async () => {
  //   try {
  //     const response = await fetch(hostName + "/api/v1/ros/actions");
  //     const data = await response.json();
  //     // console.log(data.data.Actions);
  //     setGetAllDuties(data.data.Actions);
  //     abc = data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  function getTasks() {
    axios
      .get(hostName + "/api/v1/ros/actions")
      .then((res) => {
        abc = res.data.data.Actions;
        console.log(abc);
        setGetAllDuties(res.data.data.Actions);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
  console.log(board);
  return (
    <>
      <div className="react_list_container">
        <div className="react_list_choose">
          <div
            style={{ width: "25vw", height: "100vh", border: "2px solid red" }}
          >
            {getAllDuties?.map((duty, index) => {
              return (
                <SonSbling
                  key={index}
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
                <SonSbling
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
