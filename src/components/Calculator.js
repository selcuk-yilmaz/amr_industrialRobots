import React, { useState, useRef, useEffect } from "react";
import Blockly from "blockly";

function Calculator() {
  const [result, setResult] = useState("");
  const workspaceRef = useRef(null);

  useEffect(() => {
    const workspace = Blockly.inject(workspaceRef.current, {
      toolbox: `
        <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox">
          <category name="Math" colour="#5C81A6">
            <block type="math_number"></block>
            <block type="math_arithmetic"></block>
          </category>
          <category name="Logic" colour="#5CA65C">
            <block type="logic_boolean"></block>
            <block type="logic_compare"></block>
          </category>
          <category name="Variables" colour="#A65C81" custom="VARIABLE"></category>
        </xml>
      `,
    });

    Blockly.Blocks["math_arithmetic"] = {
      init: function () {
        this.jsonInit({
          type: "math_arithmetic",
          message0: "%1 %2 %3",
          args0: [
            {
              type: "input_value",
              name: "A",
              check: "Number",
            },
            {
              type: "field_dropdown",
              name: "OP",
              options: [
                ["+", "ADD"],
                ["-", "MINUS"],
                ["*", "MULTIPLY"],
                ["/", "DIVIDE"],
              ],
            },
            {
              type: "input_value",
              name: "B",
              check: "Number",
            },
          ],
          inputsInline: true,
          output: "Number",
          colour: 230,
          tooltip: "",
          helpUrl: "",
        });
      },
    };

    Blockly.JavaScript["math_arithmetic"] = function (block) {
      const operator = block.getFieldValue("OP");
      const a = Blockly.JavaScript.valueToCode(
        block,
        "A",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      const b = Blockly.JavaScript.valueToCode(
        block,
        "B",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      return [`${a} ${operator} ${b}`, Blockly.JavaScript.ORDER_ATOMIC];
    };

    return () => workspace.dispose();
  }, []);

  const calculateResult = () => {
    try {
      const code = Blockly.JavaScript.workspaceToCode(
        Blockly.getMainWorkspace()
      );
      const newResult = eval(code);
      setResult(newResult);
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div>
      <h1>Calculator</h1>
      <div ref={workspaceRef} style={{ height: 400, width: 400 }}></div>
      <button onClick={calculateResult}>Calculate</button>
      <h2>Result: {result}</h2>
    </div>
  );
}

export default Calculator;
