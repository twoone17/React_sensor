import React from "react";
import { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
function AnalysisHistory({ localStorageKey, localStorageValue, dateChange }) {
  console.log(localStorageKey);
  console.log(localStorageValue);
  console.log(dateChange.length);

  function ShowDateLog() {
    let NewDate = localStorageKey[0].substring(0, 8);
    let DateSet = new Set();
    const Newarray = [];
    console.log(NewDate);
    for (let i = 0; i < localStorageKey.length; i++) {
      DateSet.add(NewDate);
      NewDate = localStorageKey[i].substring(0, 8);
    }
    DateSet.forEach((element) => Newarray.push(element));

    return (
      <ul>
        {Newarray.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      기록 로그
      <ShowDateLog />
      {/* <h1>{localStorageKey}</h1>
      <h1>{localStorageValue}</h1>
      <h1>{dateChange}</h1> */}
    </div>
  );
}

export default AnalysisHistory;
