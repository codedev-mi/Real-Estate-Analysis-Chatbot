// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export const exportCSV = (filename, rows) => {
//   const csv = [
//     Object.keys(rows[0]).join(","),
//     ...rows.map((r) => Object.values(r).join(",")),
//   ].join("\n");

//   const blob = new Blob([csv], { type: "text/csv" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = filename + ".csv";
//   link.click();
// };

// export const exportPDF = (filename, rows) => {
//   const doc = new jsPDF();
//   doc.text(filename.toUpperCase(), 14, 15);

//   autoTable(doc, {
//     head: [Object.keys(rows[0])],
//     body: rows.map((r) => Object.values(r)),
//   });

//   doc.save(filename + ".pdf");
// };

// export const exportJSON = (filename, data) => {
//   const blob = new Blob([JSON.stringify(data, null, 2)], {
//     type: "application/json",
//   });

//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = filename + ".json";
//   link.click();
// };



export const exportCSV = (rows, filename = "data.csv") => {
  if (!rows || rows.length === 0) return;

  const headers = Object.keys(rows[0]).join(",");
  const csvRows = rows.map(row =>
    Object.values(row).join(",")
  );

  const csvString = [headers, ...csvRows].join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

// PDF Export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPDF = (data, filename) => {
  const doc = new jsPDF();

  doc.text(data.summary || "Report", 10, 10);

  autoTable(doc, {
    startY: 20,
    head: [Object.keys(data.table[0])],
    body: data.table.map(row => Object.values(row)),
  });

  doc.save(filename);
};
