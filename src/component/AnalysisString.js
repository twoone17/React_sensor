import React from "react";
import { useState, useEffect } from "react";
function AnalysisString({ ParsedStorage }) {
  return (
    <div>
      현재 상태
      <h1>
        총 진동횟수 :{" "}
        {ParsedStorage.XVibrateStorage + ParsedStorage.YVibrateStorage}
      </h1>
    </div>
  );
}

export default AnalysisString;
