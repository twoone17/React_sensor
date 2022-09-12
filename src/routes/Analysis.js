import React from "react";
import AnalysisString from "../component/AnalysisString";
import { useState, useEffect } from "react";
import AnalysisHistory from "../component/AnalysisHistory";
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

  console.log(SortedStorage);
  for (let i = 0; i < localStorage.length; i++) {
    localStorageKey[i] = Array.from(SortedStorage.keys())[i];
    localStorageValue[i] = Array.from(SortedStorage.values())[i];
  }

  Storage = localStorageValue[0];
  if (Storage != null) {
    ParsedStorage = JSON.parse(Storage);
  }

  // for (let i = 0; i < localStorageKey.length; i++) {
  //   if (!localStorageKey[i].includes(date)) {
  //     //console.log("날짜 변경 index" + i);
  //     dateChange.push(i);
  //   }
  //   date = localStorageKey[i].substring(0, 8);
  // }

  //dateChange.forEach((item) => console.log(item));

  for (let i = 0; i < localStorageValue.length; i++) {
    localStorageValue[i] = JSON.parse(localStorageValue[i]);
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
        width={730}
        height={250}
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

  function Piechart({ Piekey, Pievalue }) {
    // const key = localStorageKey[0];
    // const value1 = localStorageValue[0];
    const key = Piekey;
    const value1 = Pievalue;
    console.log("11", value1.XTimeStorage);
    const data02 = [
      {
        name: "X만 안좋았던 시간",
        value: value1.XTimeStorage,
      },
      {
        name: "Y만 안좋았던 시간",
        value: value1.YTimeStorage,
      },
      {
        name: "X Y가 모두 안좋았던 시간",
        value: value1.Duplicated,
      },
      {
        name: "자세가 좋았던 시간",
        value: parseInt(
          value1.TotalTimeStorage -
            (value1.XTimeStorage + value1.YTimeStorage - value1.Duplicated)
        ),
      },
    ];

    return (
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
    );
  }

  return (
    <div className="back">
      <h1>현재 상태 측정 </h1>
      <Piechart PieKey={localStorageKey[0]} Pievalue={localStorageValue[0]} />
      <AnalysisString ParsedStorage={ParsedStorage} />
      <p></p>
      <h1>이전 기록 확인</h1>
      <AnalysisHistory
        localStorageKey={localStorageKey}
        localStorageValue={localStorageValue}
        dateChange={dateChange}
      />
      <Linechart />
    </div>
  );
}

export default Analysis;
