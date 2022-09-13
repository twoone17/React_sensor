import React from "react";
import Footer from "../component/Footer";
import AnalysisString from "../component/AnalysisString";
import { useState, useEffect } from "react";
import AnalysisHistory from "../component/AnalysisHistory";
import MyPieChart from "../component/MyPieChart";
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
    const value = localStorage.getItem(key);
    StorageMap.set(localStorage.key(i), localStorage.getItem(key));
  }
  const SortedStorage = new Map([...StorageMap].sort().reverse());

  for (let i = 0; i < localStorage.length; i++) {
    localStorageKey[i] = Array.from(SortedStorage.keys())[i];
    localStorageValue[i] = Array.from(SortedStorage.values())[i];
  }

  for (let i = 0; i < localStorageValue.length; i++) {
    localStorageValue[i] = JSON.parse(localStorageValue[i]);
  }

  function Linechart() {
    let lvalue = [];
    const data01 = [];
    for (let i = 0; i < localStorageValue.length; i++) {
      lvalue[i] =
        ((localStorageValue[i].TotalTimeStorage -
          (localStorageValue[i].XTimeStorage +
            localStorageValue[i].YTimeStorage -
            localStorageValue[i].Duplicated)) /
          localStorageValue[i].TotalTimeStorage) *
        100;
    }
    let i = localStorageValue.length;
    let NewCount = 6;
    while (i >= 0 && NewCount >= 0) {
      i--;
      NewCount--;
      data01.push({
        name: localStorageKey[i],
        value: lvalue[i],
      });
    }
    console.log(data01);

    return (
      <LineChart
        width={350}
        height={150}
        data={data01}
        margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    );
  }

  return (
    <div className="back">
      <div className="c">
        <div>
          <h5>최근 당신의 자세는 어땠을까요 ?</h5>
          <MyPieChart
            Piekey={localStorageKey[0]}
            Pievalue={localStorageValue[0]}
          />
          <AnalysisString ParsedStorage={localStorageValue[0]} />
        </div>
        <hr />
        <Linechart />
        <hr />
        <p className="d">{advice[Math.floor(Math.random() * advice.length)]}</p>
        <div>
          <h5>이전 기록 확인</h5>
          <AnalysisHistory
            localStorageKey={localStorageKey}
            localStorageValue={localStorageValue}
          />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default Analysis;
