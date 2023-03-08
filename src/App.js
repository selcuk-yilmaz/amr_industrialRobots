import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import DragDrop from "./components/dragAndDrop/DragDrop";
import Example from "./components/example_RLDD/Example";
// import TodoList from "./components/TodoList";
// import Calculator from "./components/Calculator";
// import DragDrop from "./components/DragDrop";
// import Home from "./components/combine/Home"

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {/* <Home /> */}
        {/* <Calculator /> */}
        {/* <TodoList /> */}
        <Example />
        {/* <DragDrop /> */}
      </div>
    </DndProvider>
  );
}

export default App;
