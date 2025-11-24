import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

function ResultChart({ data }) {
  if (!data || data.length === 0) return <div>No chart data</div>;

  return (
    <LineChart width={700} height={350} data={data}>
      <CartesianGrid stroke="#ddd" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Line type="monotone" dataKey="price" stroke="blue" />
      <Line type="monotone" dataKey="demand" stroke="green" />
    </LineChart>
  );
}

export default ResultChart;
