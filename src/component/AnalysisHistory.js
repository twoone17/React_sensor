import React from "react";
import { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
function AnalysisHistory({ localStorageKey, localStorageValue, dateChange }) {
  const [state1, setState1] = useState("start");
  // const [localStoragekeyState, setlocalStorageKeyState] = useState([]);
  let storageArray = [""];
  const [storageArraystate, SetstorageArraystate] = useState([""]);

  function StorageHistory({ storageArraystate }) {
    const rendering = () => {
      const result = [];

      for (let i = 0; i < storageArraystate[0].length; i++) {
        result.push(<li key={i}>{storageArraystate[0][i]}</li>);
      }
      return result;
    };

    return <div>{rendering()}</div>;
  }

  function ShowDateLog() {
    let NewDate = localStorageKey[0].substring(0, 8);
    let DateSet = new Set();
    const Newarray = [];
    // console.log(NewDate);
    for (let i = 0; i < localStorageKey.length; i++) {
      DateSet.add(NewDate);
      NewDate = localStorageKey[i].substring(0, 8);
    }
    DateSet.forEach((element) => Newarray.push(element));

    const HandleOnClick = (date, e) => {
      storageArray = [];
      SetstorageArraystate([]);
      for (let i = 0; i < localStorageKey.length; i++) {
        if (localStorageKey[i].includes(date)) {
          storageArray.push(localStorageKey[i]);
        }
      }
      // console.log("Please" + localStoragekeyState);
      setState1(date);
      SetstorageArraystate((storageArraystate) => [
        ...storageArraystate,
        storageArray,
      ]);
      console.log(storageArraystate);
    };

    return (
      <div>
        <ul>
          {Newarray.map((item, index) => (
            <li key={item} onClick={(e) => HandleOnClick(item, e)}>
              {item}
            </li>
          ))}
        </ul>
        {state1}의 로그 확인
        <StorageHistory storageArraystate={storageArraystate} />
      </div>
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
