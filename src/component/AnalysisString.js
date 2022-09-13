import React from "react";
import { useState, useEffect } from "react";
function AnalysisString({ ParsedStorage }) {
  return (
    <div>
      <p>
        총 진동횟수 :{" "}
        {ParsedStorage.XVibrateStorage + ParsedStorage.YVibrateStorage}
      </p>
    </div>
  );
}

export default AnalysisString;
