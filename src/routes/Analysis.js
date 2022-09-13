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

    for (let i = 0; i < 2; i++) {
      lvalue[i] =
        localStorageValue[i].TotalTimeStorage -
        (localStorageValue[i].XTimeStorage +
          localStorageValue[i].YTimeStorage -
          localStorageValue[i].TotalTimeStorage);
    }

    const data01 = [
      {
        name: localStorageKey[2],
        value: lvalue[2],
      },
      {
        name: localStorageKey[1],
        value: lvalue[1],
      },
      {
        name: localStorageKey[0],
        value: lvalue[0],
      },
    ];
    return (
      <LineChart
        width={500}
        height={200}
        data={data01}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
          <h5>현재 상태 측정</h5>
          <MyPieChart
            Piekey={localStorageKey[0]}
            Pievalue={localStorageValue[0]}
          />
          <AnalysisString ParsedStorage={localStorageValue[0]} />
        </div>
        <p></p>
        <div>
          <h5>이전 기록 확인</h5>
          <AnalysisHistory
            localStorageKey={localStorageKey}
            localStorageValue={localStorageValue}
            dateChange={dateChange}
          />
        </div>
        
      </div>

      {/* <Linechart /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default Analysis;
