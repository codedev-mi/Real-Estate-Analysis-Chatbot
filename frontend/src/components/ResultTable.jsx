import React from "react";

function ResultTable({ rows }) {
  if (!rows || rows.length === 0) return <div>No data</div>;

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Year</th>
          <th>Area</th>
          <th>Price</th>
          <th>Demand</th>
          <th>Carpet Area</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td>{r.year}</td>
            <td>{r.area}</td>
            <td>{r.price}</td>
            <td>{r.demand}</td>
            <td>{r.size}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultTable;
