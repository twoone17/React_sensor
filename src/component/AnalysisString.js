import React from "react";
import { useState, useEffect } from "react";
import "./Analyz.css";

function AnalysisString({ ParsedStorage }) {
  return (
    <div>
      <p className="f">
        총 진동횟수 :{" "}
        {ParsedStorage.XVibrateStorage + ParsedStorage.YVibrateStorage}
      </p>
    </div>
  );
}


export default AnalysisString;
