import styled from "styled-components";

export const List = styled.div`
  border: 1px
    ${(props) => (props.isDraggingOver ? "dashed #000" : "solid #ddd")};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`;

export const Container = styled(List)`
  margin: 0.5rem 0.5rem 1.5rem;
  min-height:850px;
  border: 2px solid red;
`;
export const Kiosk = styled(List)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
  border:2px solid blue;
`;
export const postMission = styled.div`
  position: relative;
  /* top: 700px; */
  /* right: 0; */
  /* bottom: 0; */
  width: 200px;
  border:2px solid pink;
`;
export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-actions: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  color: "black";
  border: 2px ${(props) => (props.isDragging ? "dashed #000" : "solid #dddddd")};
`;
export  const Clone = styled(Item)`
  ~ div {
    transform: none !important;
  }
`;

 export const Handle = styled.div`
  display: flex;
  align-actions: center;
  align-content: center;
  user-select: none;
  margin: -0.5rem 0.5rem -0.5rem -0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  border-radius: 3px 0 0 3px;
  background: #fff;
  border-right: 1px solid #ddd;
  color: #000;
`;




export const Notice = styled.div`
  display: flex;
  align-actions: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
  height: 500px;
`;

export const Button = styled.button`
  display: flex;
  /* align-actions: center; */
  /* align-content: center; */
  justify-content:flex-end;
  align-items: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
`;

export const ButtonText = styled.div`
  margin: 0 1rem;
`;

export const Content = styled.div`
  margin-right: 200px;
`;

// const Item = styled.div`
//   display: flex;
//   user-select: none;
//   padding: 0.5rem;
//   margin: 0 0 0.5rem 0;
//   align-actions: flex-start;
//   align-content: flex-start;
//   line-height: 1.5;
//   border-radius: 3px;
//   background: #fff;
//   color: "black";
//   border: 1px ${(props) => (props.isDragging ? "dashed #000" : "solid #ddd")};
// `;