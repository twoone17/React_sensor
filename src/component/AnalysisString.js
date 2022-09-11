import React from "react";
import { useState, useEffect } from "react";
function AnalysisString(props) {
  //   const Storage = {
  //     XTimeStorage: 0,
  //     YTimeStorage: 0,
  //     XVibrateStorage: 0,
  //     YVibrateStorage: 0,
  //     Duplicated: 0,
  //     TotalTimeStorage: 0,
  //   };'
  let ParsedStorage;
  let localStorageKey = [];
  let localStorageValue = [];
  let date;
  let dateChange = [];
  const [StorageData, setStorageData] = useState([
    {
      XTimeStorage: 0,
      YTimeStorage: 0,
      XVibrateStorage: 0,
      YVibrateStorage: 0,
      Duplicated: 0,
      TotalTimeStorage: 0,
    },
  ]);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorageKey[i] = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageValue[i] = value;
  }

  localStorageKey.sort();
  localStorageKey.reverse();
  date = localStorageKey[0].substring(0, 8);
  console.log(localStorageKey);
  //localStorage값 배열에 저장

  //가장 최신(Home에서 작동중인 상태 분석)
  const Storage = localStorageValue[0];
  if (Storage != null) {
    ParsedStorage = JSON.parse(Storage);
  }

  for (let i = 0; i < localStorageKey.length; i++) {
    if (!localStorageKey[i].includes(date)) {
      console.log("날짜 변경 index" + i);
      dateChange.push(i);
    }
    date = localStorageKey[i].substring(0, 8);
  }

  dateChange.forEach((item) => console.log(item));

  console.log(ParsedStorage.XTimeStorage);

  return (
    <div>
      현재 상태 {props.name}
      <h1>
        총 진동횟수 :{" "}
        {ParsedStorage.XVibrateStorage + ParsedStorage.YVibrateStorage}
      </h1>
    </div>
  );
}

export default AnalysisString;
