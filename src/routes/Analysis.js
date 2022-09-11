import React from "react";
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
} from "recharts";

function Analysis() {
  const data1 = localStorage.getItem("22.09.11. 15:13:06");
  const data2 = JSON.parse(data1);
  const data02 = data2;

  return (
    <div className="back">
      <PieChart width={730} height={250}>
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          fill="#82ca9d"
          label
        />
      </PieChart>
    </div>
  );
}

export default Analysis;
