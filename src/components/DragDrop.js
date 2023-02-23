import React, { useState } from "react";
import Picture from "./Picture";
import {useDrop} from "react-dnd"
import "../App.css"

const PictureList = [
  {
    id: 1,
    url: "https://media.istockphoto.com/id/1170650529/tr/foto%C4%9Fraf/tamamlanan-g%C3%B6revler-yap%C4%B1lacaklar-listesinde-i%C5%9Faretlenir.jpg?b=1&s=612x612&w=0&k=20&c=mVhgmDiSbexsYEPV7bffACX_rnA2HWiyQIpV9utr2mQ="
  },
  {
    id: 2,
    url: "https://media.istockphoto.com/id/1285082518/tr/foto%C4%9Fraf/ata%C5%9Fl%C4%B1-tablet-yap%C4%B1lacaklar-listesi-3d-ill%C3%BCstrasyon-3d-render.jpg?b=1&s=612x612&w=0&k=20&c=5sGFzHgny--OZzSRG3Mvp9lq2kDdWHpSHOrXzoglMvY="
  },
  {
    id: 3,
    url: "https://media.istockphoto.com/id/867672394/tr/foto%C4%9Fraf/not-defteri-ile-fikir-veya-yap%C4%B1lacaklar-listesini-bir-fincan-kahve-parlak-mavi-zemin.jpg?b=1&s=612x612&w=0&k=20&c=1HhcpbOaVsUxDyz_v1TXkvy6qREJ2Z9ra6s_UD13xGc="
  },
];

function DragDrop() {
    const [board, setBoard] = useState([]);
    const [{isOver},drop]= useDrop(()=>({
        accept:"image",
        drop:(item) => addImageToBoard(item.id),
        collect:(monitor) => ({
            isOver:!!monitor.isOver(),
        })
    }))
const addImageToBoard = (id) =>{
    const pictureList = PictureList.filter((picture)=> id === picture.id);
    setBoard((board) =>[...board,pictureList[0]])

}
  return (
    <>
      <div className="Pictures">
        {PictureList.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />
        })}
      </div>
      <div className="Board">
        {board.map((picture)=>{
            return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>
    </>
  );
}

export default DragDrop;
