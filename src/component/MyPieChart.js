import React from "react";
import { useState, useEffect } from "react";
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
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];



function MyPieChart({ Piekey, Pievalue }) {
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

  let key = Piekey;
  let value1 = Pievalue;
  console.log("PieKey" + Piekey);
  console.log("PieValue" + Pievalue);
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
    <PieChart width={350} height={200}> 
      <Pie
        data={data02}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        label="name"
        fill="green"
        >
        {
          data02.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>             
          ))
        }
      </Pie>
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#ff7300" />
    </PieChart>
  );
}

export default MyPieChart;
