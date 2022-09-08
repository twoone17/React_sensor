import React from "react";
import { PieChart } from 'react-minimal-pie-chart';

function Analysis({ data }) {
  return (
    <div className="back">
      <PieChart
        data={[
          { title: "One", value: 10, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" },
        ]}
        label={({ dataEntry }) => dataEntry.value}
        animate
        //width = 
        //viewBoxSize = {[100, 80]}
      />
    </div>
  );
}
  
export default Analysis;
