// import React, { useState } from "react";

// function ChatInput({ onSubmit, onCompare }) {
//   const [query, setQuery] = useState("");
//   const [compare, setCompare] = useState("");

//   return (
//     <div>
//       <label>Search Area</label>
//       <input
//         className="form-control mb-2"
//         placeholder="Enter area name..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       <button className="btn btn-primary w-100 mb-3" onClick={() => onSubmit(query)}>
//         Analyze
//       </button>

//       <label>Compare Areas</label>
//       <input
//         className="form-control mb-2"
//         placeholder="e.g. Wakad, Aundh"
//         value={compare}
//         onChange={(e) => setCompare(e.target.value)}
//       />

//       <button
//         className="btn btn-success w-100"
//         onClick={() => onCompare(compare.split(",").map((x) => x.trim()))}
//       >
//         Compare
//       </button>
//     </div>
//   );
// }

// export default ChatInput;



import React, { useState } from "react";

const areaSuggestions = [
  "Wakad", "Aundh", "Baner", "Hinjewadi", "Kothrud", "Bavdhan", "Pimple Saudagar"
];

export default function ChatInput({ onSubmit, onCompare }) {
  const [query, setQuery] = useState("");
  const [compareText, setCompareText] = useState("");

  const filtered = areaSuggestions.filter(a =>
    a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h4>Search Area</h4>

      <input
        className="input-box"
        placeholder="Enter area name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        list="areas"
      />

      <datalist id="areas">
        {filtered.map((a, index) => (
          <option key={index} value={a} />
        ))}
      </datalist>

      <button className="btn btn-primary w-100 mb-3" onClick={() => onSubmit(query)}>
        Analyze
      </button>

      <h5>Compare Areas</h5>

      <input
        className="input-box"
        placeholder="Wakad, Aundh"
        value={compareText}
        onChange={(e) => setCompareText(e.target.value)}
      />

      <button className="btn btn-secondary w-100"
        onClick={() => onCompare(compareText.split(",").map(a => a.trim()))}
      >
        Compare Areas
      </button>
    </div>
  );
}
