import React from "react";
import Footer from "../component/Footer";
import AnalysisString from "../component/AnalysisString";
import { useState, useEffect } from "react";
import AnalysisHistory from "../component/AnalysisHistory";
import MyPieChart from "../component/MyPieChart";
import NeckMode from "../component/NeckMode";
import BackMode from "../component/BackMode";
import "./s1.css";
import "../component/Analyz.css";

import {
  PieChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  Cell,
  LineChart,
} from "recharts";

function Analysis() {
  let ParsedStorage;
  let localStorageKey = [];
  let localStorageValue = [];
  let date;
  let dateChange = [];
  let key;
  let value1;
  const advice = [
    "바른 자세를 유지하면 신체의 핵심 근육들이 활발히 움직여 기초대사량과 열량 소모를 높입니다 !",
    "허리는 일자로 펴고 앉으시되 앞으로 나온 턱을 뒤로 밀어 넣고, 어깨를 편 자세를 함께 유지해주세요 ! ",
    "바른 자세는 업무 능력을 향상시킵니다 ! ",
    "앉아있을땐 20~30분 간격으로 몸을 틀어주고 스트레칭을 하는게 좋아요 !",
  ];

  let StorageMap = new Map(); //TODO:
  const [mode, setMode] = useState(1); //neck, back 바꾸는 버튼에 쓰임, 0이면 디폴트 넥
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

  // for (let i = 0; i < localStorage.length; i++) {
  //   const key = localStorage.key(i);
  //   const value = localStorage.getItem(key);
  //   StorageMap.set(localStorage.key(i), localStorage.getItem(key));
  // }
  // const SortedStorage = new Map([...StorageMap].sort().reverse());

  // for (let i = 0; i < localStorage.length; i++) {
  //   localStorageKey[i] = Array.from(SortedStorage.keys())[i];
  //   localStorageValue[i] = Array.from(SortedStorage.values())[i];
  // }

  // for (let i = 0; i < localStorageValue.length; i++) {
  //   localStorageValue[i] = JSON.parse(localStorageValue[i]);
  // }

  // function Linechart() {
  //   let lvalue = [];
  //   const data01 = [];
  //   for (let i = 0; i < localStorageValue.length; i++) {
  //     lvalue[i] =
  //       ((localStorageValue[i].TotalTimeStorage -
  //         (localStorageValue[i].XTimeStorage +
  //           localStorageValue[i].YTimeStorage -
  //           localStorageValue[i].Duplicated)) /
  //         localStorageValue[i].TotalTimeStorage) *
  //       100;
  //   }
  //   console.log(lvalue[0]);

  //   let i = localStorageValue.length;
  //   let NewCount = 6;
  //   while (i >= 0 && NewCount >= 0) {
  //     data01.push({
  //       name: localStorageKey[NewCount],
  //       value: lvalue[NewCount],
  //     });
  //     i--;
  //     NewCount--;
  //   }
  //   console.log("data01 : " + data01[0].name);

  //   return (
  //     <LineChart
  //       width={350}
  //       height={150}
  //       data={data01}
  //       margin={{ top: 5, right: 40, left: 0, bottom: 0 }}
  //     >
  //       <CartesianGrid strokeDasharray="3 3" />
  //       <XAxis dataKey="name" />
  //       <YAxis />
  //       <Tooltip />
  //       <Legend />
  //       <Line
  //         type="monotone"
  //         dataKey="value"
  //         stroke="#8884d8"
  //         name="자세 좋았던 시간 비율"
  //       />
  //     </LineChart>
  //   );
  // }

  function onClickMode() {
    if (mode == 1) {
      setMode(0);
    } else {
      setMode(1);
    }

    // if (flagCount % 2) {
    //   setFlag(true);
    //   console.log(flag);
    // } else {
    //   setFlag(false);
    //   console.log(flag);
    // }
  }

  return (
    <div>
      <div className="back" style={{ height: "180vh" }}>
        <br></br>
        <br></br>
        <br></br>
        <button className="btn-3" onClick={onClickMode}>
          {" "}
          모드 바꾸기 {mode ? "neck" : "back"}
        </button>
        {mode ? <NeckMode /> : <BackMode />}
      </div>
    </div>
  );
}

export default Analysis;
