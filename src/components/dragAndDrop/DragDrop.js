import React, { useState } from 'react';
import Picture from './Picture';
import "../../App.css";
import {useDrop} from "react-dnd";

const PictureList = [
  {
    id: 1,
    url: "https://cdn.pixabay.com/photo/2023/01/31/05/59/zebra-7757193_640.jpg",
  },
  {
    id: 2,
    url: "https://cdn.pixabay.com/photo/2023/02/13/10/30/eye-7787024__340.jpg",
  },
  {
    id: 3,
    url: "https://cdn.pixabay.com/photo/2022/12/25/04/05/living-room-7676789_640.jpg",
  },
];

function DragDrop() {
    const [board, setBoard] = useState([]);
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "image",
      drop: (item) => addImageToBoard(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
const addImageToBoard = (id)=>{
// console.log(id);
console.log(PictureList);
const pictureList = PictureList.filter((picture)=> id === picture.id);
setBoard((board)=>[...board,pictureList[0]]) //! board a çoklu ekleme yapmak için
// setBoard([pictureList[0]]); //! board a tek bir şey ekleme yapmak için
}
  return (
    <>
    <div className="Pictures">{PictureList.map((picture)=>{
        return <Picture key={picture.id} url={picture.url} id={picture.id}/>
    })} 
    </div>
    <div className="Board" ref={drop}>
        {board.map((picture)=>{
            return <Picture url={picture.url} id={picture.id} />
        })}
    </div>
    </>
  )
}

export default DragDrop