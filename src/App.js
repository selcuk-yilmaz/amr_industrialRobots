import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Son from "./components/Son";
// import DragDrop from "./components/dragAndDrop/DragDrop";
// import Example from "./components/example_RLDD/Example";
// import OpenAI from "./components/OpenAI";
// import TodoList from "./components/TodoList";
// import Calculator from "./components/Calculator";

// import DragAndDropHome from "./components/DragAndDrop";

// import Home from "./components/combine/Home"
//  import List from "./components/List"

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      {/* <Home /> */}
      {/* <DragAndDrop /> */}
      {/* <Calculator /> */}
      {/* <TodoList /> */}
      {/* <Example /> */}
      {/* <DragDrop /> */}
      {/* <OpenAI/> */}
      {/* <List /> */}
      {/* <DragAndDropHome /> */}
      <Son/>
    </div>
    </DndProvider>
  );
}

export default App;
