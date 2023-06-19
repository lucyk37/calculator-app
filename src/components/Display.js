import React from "react";
import { ReactFitty } from "react-fitty";
import "./Display.css";

const Display = ({ value }) => {
  return (
    <ReactFitty className="display" mode="single" max={70}>
      {value}
    </ReactFitty>
  );
};

export default Display;