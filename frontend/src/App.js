import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import ChatInput from "./components/ChatInput";
import ResultSummary from "./components/ResultSummary";
import ResultChart from "./components/ResultChart";
import ResultTable from "./components/ResultTable";
import CompareChart from "./components/CompareChart";

import ExportButtons from "./components/ExportButtons";

function App() {
  const [result, setResult] = useState(null);
  const [compareRes, setCompareRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------
  // Analyze area
  // ---------------------------
  const analyze = async (query) => {
    setLoading(true);
    setCompareRes(null);
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/analyze/", {
        query,
      });
      setResult(res.data);
    } catch (err) {
      setError("Error contacting backend.");
      console.error(err);
    }
    setLoading(false);
  };

  // ---------------------------
  // Compare areas
  // ---------------------------
  const compare = async (areas) => {
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/compare/", {
        areas,
      });
      setCompareRes(res.data);
    } catch (err) {
      setError("Comparison failed.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* --------------------------------------------
          SIDEBAR
      --------------------------------------------- */}
      <div
        className="p-3"
        style={{
          width: "260px",
          background: "white",
          borderRight: "1px solid #e5e7eb",
        }}
      >
        <h4>🏠 Real Estate AI</h4>
        <ChatInput onSubmit={analyze} onCompare={compare} />

        {error && <div className="mt-3 alert alert-danger">{error}</div>}
      </div>

      {/* --------------------------------------------
          MAIN CONTENT
      --------------------------------------------- */}
      <div className="flex-grow-1 p-4" style={{ background: "#f0f5ff" }}>
        <h2 className="mb-4">Real Estate Analytics Dashboard</h2>

        {loading && (
          <div className="alert alert-secondary">Loading, please wait...</div>
        )}

        {/* --------------------------
            SINGLE AREA ANALYSIS
        --------------------------- */}
        {result && (
          <>
            <ResultSummary text={result.summary} />

            <ExportButtons table={result.table} summary={result.summary} />

            <div className="card p-3 shadow-sm mb-4">
              <ResultChart data={result.chart} />
            </div>

            <div className="card p-3 shadow-sm">
              <ResultTable rows={result.table} />
            </div>
          </>
        )}

        {/* --------------------------
            MULTI-AREA COMPARISON
        --------------------------- */}
        {compareRes && (
          <>
            <div className="alert alert-info">
              <strong>Comparing: </strong> {compareRes.summary}
            </div>

            <ExportButtons
              table={compareRes.table || []}
              summary={compareRes.summary}
            />

            <div className="card p-3 shadow-sm mb-4">
              <CompareChart data={compareRes} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
