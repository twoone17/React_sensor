import React from "react";
import { useState, useEffect } from "react";
import Analysis from "../routes/Analysis";
import MyPieChart from "./MyPieChart";
import AnalysisString from "./AnalysisString";
let PieArray = [];
function AnalysisHistory({ localStorageKey, localStorageValue, dateChange }) {
  const [state1, setState1] = useState("start");
  const [VibrateBooleanstate1, setVibrateBooleanState1] = useState(false);
  const [PieChartBooleanState1, setPieChartBooleanState1] = useState(false);
  const [Vibratestate1, setVibrateState1] = useState([""]);
  const [PieChartState1, setPieChartState1] = useState([""]);
  const [LiState, setLiState] = useState();
  // const [localStoragekeyState, setlocalStorageKeyState] = useState([]);
  let storageArray = [""];
  let ParsedStorage;
  const [storageArraystate, SetstorageArraystate] = useState([""]);

  function StorageHistory({ storageArraystate }) {
    const ShowPieChart = (date, i) => {
      PieArray = [];
      setPieChartState1((PieChartState1) => []);
      let indexKey = localStorageKey.indexOf(date);
      let PieKey = date;
      let PieValue = localStorageValue[indexKey];
      setPieChartBooleanState1(true);
      setPieChartState1((PieChartState1) => [
        ...PieChartState1,
        PieKey,
        PieValue,
      ]);
      PieArray.push(PieKey, PieValue);
      console.log("PieKey " + PieArray[0]);
      console.log("PieValue" + PieArray[1]);
      // console.log(PieChartState1);
      // console.log("PieChartState[0]" + PieChartState1[0]);
      // console.log("PieChartState[1]" + PieChartState1[1]);
      setLiState(i);
    };
    const ShowVibration = (date, i) => {
      setVibrateState1((Vibratestate1) => []);
      let indexKey = localStorageKey.indexOf(date);
      let Storage = localStorageValue[indexKey];
      setVibrateBooleanState1(true);
      setVibrateState1((Vibratestate1) => [...Vibratestate1, Storage]);
      console.log(Vibratestate1);
      setLiState(i);
      console.log(Vibratestate1[0].XTimeStorage);
    };

    const rendering = () => {
      const result = [];

      for (let i = 0; i < storageArraystate[0].length; i++) {
        result.push(
          <li
            key={i}
            onClick={(e) => {
              ShowVibration(storageArraystate[0][i], i, e);
              ShowPieChart(storageArraystate[0][i], i, e);
            }}
          >
            {LiState === i && VibrateBooleanstate1 ? (
              <AnalysisString ParsedStorage={Vibratestate1[0]} />
            ) : (
              "Hi"
            )}
            {LiState === i && PieChartBooleanState1 ? (
              <MyPieChart Piekey={PieArray[0]} Pievalue={PieArray[1]} />
            ) : (
              "Hi"
            )}
            {storageArraystate[0][i]}
          </li>
        );
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
