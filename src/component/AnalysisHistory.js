import React from "react";
import { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
function AnalysisHistory({ localStorageKey, localStorageValue, dateChange }) {
  const [state1, setState1] = useState("start");
  // const [localStoragekeyState, setlocalStorageKeyState] = useState([]);
  let storageArray = [];
  const [storageArraystate, SetstorageArraystate] = useState([]);

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

    const HandleOnClick = (date, e) => {
      storageArray = [];
      SetstorageArraystate([]);
      for (let i = 0; i < localStorageKey.length; i++) {
        if (localStorageKey[i].includes(date)) {
          console.log(localStorageKey[i]);
          // setlocalStorageKeyState([localStorageKey[i], localStoragekeyState]);
          storageArray.push(localStorageKey[i]);
        }
      }
      console.log(storageArray);
      // console.log("Please" + localStoragekeyState);
      setState1(date);
      SetstorageArraystate((storageArraystate) => [
        ...storageArraystate,
        storageArray,
      ]);
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
        {state1}의 날짜
        <p>{storageArraystate}</p>
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
