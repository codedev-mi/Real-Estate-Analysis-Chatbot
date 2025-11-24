import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

function CompareChart({ data }) {
  if (!data) return <div>No comparison data</div>;

  // Convert to list of datasets
  const datasets = Object.entries(data); // [["Wakad", [...]], ["Aundh", [...]]]

  // Create merged unified chart rows
  let merged = {};

  datasets.forEach(([area, list]) => {
    list.forEach((row) => {
      if (!merged[row.year]) merged[row.year] = { year: row.year };
      merged[row.year][area] = row.price; // only price for comparison
    });
  });

  const chartData = Object.values(merged);

  return (
    <LineChart width={750} height={350} data={chartData}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />

      {datasets.map(([area], i) => (
        <Line
          key={area}
          type="monotone"
          dataKey={area}
          stroke={["#007bff", "#28a745", "#ff5733", "#6f42c1"][i]}
        />
      ))}
    </LineChart>
  );
}

export default CompareChart;
