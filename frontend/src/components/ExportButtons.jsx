// import React from "react";
// import { exportCSV, exportPDF, exportJSON } from "../utils/exportUtils";

// export default function ExportButtons({ rawData, filename }) {
//   return (
//     <div className="export-row">
//       <button
//         className="btn btn-success"
//         onClick={() => exportCSV(filename, rawData)}
//       >
//         Export CSV
//       </button>

//       <button
//         className="btn btn-danger"
//         onClick={() => exportPDF(filename, rawData)}
//       >
//         Export PDF
//       </button>

//       <button
//         className="btn btn-primary"
//         onClick={() => exportJSON(filename, rawData)}
//       >
//         Download Data
//       </button>
//     </div>
//   );
// }



import React from "react";
import { exportCSV, exportPDF } from "../utils/exportUtils";

export default function ExportButtons({ table, summary }) {
  if (!table || table.length === 0) return null;

  return (
    <div className="d-flex gap-2 mb-3">
      <button
        className="btn btn-success btn-sm"
        onClick={() => exportCSV(table, "dataset.csv")}
      >
        Export CSV
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => exportPDF({ summary, table }, "report.pdf")}
      >
        Export PDF
      </button>

      <button
        className="btn btn-primary btn-sm"
        onClick={() => exportCSV(table, "download-data.csv")}
      >
        Download Data
      </button>
    </div>
  );
}
