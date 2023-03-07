import React, { useState, useRef, useEffect } from "react";
import Blockly from "blockly";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const workspaceRef = useRef(null);

//   useEffect(() => {
    const workspace = Blockly.inject(workspaceRef.current, {
      toolbox: `
        <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox">
          <category name="Text" colour="#5CA68D">
            <block type="text"></block>
            <block type="text_print"></block>
          </category>
          <category name="Lists" colour="#745CA6">
            <block type="lists_create_with"></block>
          </category>
          <category name="Logic" colour="#5CA65C">
            <block type="logic_boolean"></block>
            <block type="logic_compare"></block>
          </category>
        </xml>
      `,
    });

    Blockly.Blocks["add_todo"] = {
      init: function () {
        this.jsonInit({
          type: "add_todo",
          message0: "Add Todo %1",
          args0: [
            {
              type: "input_value",
              name: "TODO",
              check: "String",
            },
          ],
          previousStatement: null,
          nextStatement: null,
          colour: 230,
          tooltip: "",
          helpUrl: "",
        });
      },
    };

    Blockly.JavaScript["add_todo"] = function (block) {
      const todo = Blockly.JavaScript.valueToCode(
        block,
        "TODO",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      return `setTodos([...todos, ${todo}]);\n`;
    };

    Blockly.Blocks["delete_todo"] = {
      init: function () {
        this.jsonInit({
          type: "delete_todo",
          message0: "Delete Todo at index %1",
          args0: [
            {
              type: "input_value",
              name: "INDEX",
              check: "Number",
            },
          ],
          previousStatement: null,
          nextStatement: null,
          colour: 230,
          tooltip: "",
          helpUrl: "",
        });
      },
    };

    Blockly.JavaScript["delete_todo"] = function (block) {
      const index = Blockly.JavaScript.valueToCode(
        block,
        "INDEX",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      return `setTodos(todos.filter((todo, i) => i !== ${index}));\n`;
    };

    return () => workspace.dispose();
//   }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div ref={workspaceRef} style={{ height: 400, width: 400 }}></div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button
              onClick={() => setTodos(todos.filter((_, i) => i !== index))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;