import React from "react";
import AnalysisString from "../component/AnalysisString";
import { useState, useEffect } from "react";
import AnalysisHistory from "../component/AnalysisHistory";
//import { PieChart } from 'react-minimal-pie-chart';
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
} from "recharts";

function Analysis() {
  let ParsedStorage;
  let localStorageKey = [];
  let localStorageValue = [];
  let date;
  let dateChange = [];

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

  const SortedMap = new Map([...StorageMap].sort().reverse());
  console.log(SortedMap);
  // localStorageKey.sort();
  // localStorageKey.reverse();
  // date = localStorageKey[0].substring(0, 8);
  // console.log(localStorageKey);
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

  const data1 = Storage;
  const data2 = JSON.parse(data1);
  console.log(data2);
  const data02 = [
    {
      name: "X만 안좋았던 시간",
      value: data2.XTimeStorage,
    },
    {
      name: "Y만 안좋았던 시간",
      value: data2.YTimeStorage,
    },
    {
      name: "X Y가 모두 안좋았던 시간",
      value: data2.Duplicated,
    },
    {
      name: "자세가 좋았던 시간",
      value: parseInt(
        data2.TotalTimeStorage -
          (data2.XTimeStorage + data2.YTimeStorage - data2.Duplicated)
      ),
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="back">
      <h1>현재 상태 측정 </h1>
      <PieChart width={730} height={250}>
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          label="name"
          fill="green"
          {...data02.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </PieChart>
      <AnalysisString ParsedStorage={ParsedStorage} />
      <p></p>
      <h1>이전 기록 확인</h1>
      <AnalysisHistory
        localStorageKey={localStorageKey}
        localStorageValue={localStorageValue}
        dateChange={dateChange}
      />
    </div>
  );
}

export default Analysis;
