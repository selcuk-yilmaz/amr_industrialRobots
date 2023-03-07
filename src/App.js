import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Example from "./components/example/Example";
// import TodoList from "./components/TodoList";
// import Calculator from "./components/Calculator";
// import DragDrop from "./components/DragDrop";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {/* <Calculator /> */}
        {/* <TodoList /> */}
        <Example />
      </div>
    </DndProvider>
  );
}

export default App;
