import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Display from "./components/Display";
import Button from "./components/Button";
import ButtonBox from "./components/ButtonBox";

const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const Calculator = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

// HANDLE CLICK BUTTON
const buttonHandleClick = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  if (removeSpaces(calc.num).length < 16) {
    setCalc({
      ...calc,
      num:
        calc.num === 0 && value === "0"
          ? "0"
          : removeSpaces(calc.num) % 1 === 0
          ? toLocaleString(Number(removeSpaces(calc.num + value)))
          : toLocaleString(calc.num + value),
      res: !calc.sign ? 0 : calc.res,
    });
  }
};


// DECIMAL HANDLE CLICK
const commaClickHandler = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  setCalc({
    ...calc,
    num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
  });
};

// MATH OPERATORS HANDLE CLICK
const signClickHandler = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  setCalc({
    ...calc,
    sign: value,
    res: !calc.res && calc.num ? calc.num : calc.res,
    num: 0,
  });
};

//EQUAL SIGN CLICK
const equalsClickHandler = () => {
  if (calc.sign && calc.num) {
    const math = (a, b, sign) =>
      sign === "+"
        ? a + b
        : sign === "-"
        ? a - b
        : sign === "X"
        ? a * b
        : a / b;

        setCalc({
          ...calc,
          res:
            calc.num === "0" && calc.sign === "/"
              ? "Can't divide with 0"
              : toLocaleString(
                  math(
                    Number(removeSpaces(calc.res)),
                    Number(removeSpaces(calc.num)),
                    calc.sign
                  )
                ),
          sign: "",
          num: 0,
        });
      }
    };
  
//INVERT CLICK HANDLER
const invertClickHandler = () => {
  setCalc({
    ...calc,
    num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
    res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
    sign: "",
  });
};

// PERCENT HANDLER
const percentClickHandler = () => {
  let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
  let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };


// RESET HANDLER
const resetClickHandler = () => {
  setCalc({
    ...calc,
    sign: "",
    num: 0,
    res: 0,
  });
};

    return (
      <Wrapper>
        <Display value = {calc.num ? calc.num : calc.res} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={
                    btn === "C" ? resetClickHandler : 
                    btn === "+-"? invertClickHandler : 
                    btn === "%" ? percentClickHandler : 
                    btn === "=" ? equalsClickHandler : 
                    btn === "/" || btn === "X" || btn === "-" || btn === "+" ? signClickHandler: 
                    btn === "." ? commaClickHandler : 
                    buttonHandleClick
                  }
                />
              );
            })
          }
        </ButtonBox>
      </Wrapper>
    );
  };

export default Calculator;
