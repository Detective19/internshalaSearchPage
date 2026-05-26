// src/App.jsx — TEMPORARY TEST, we'll replace this in Task 3

import { useEffect, useState } from "react";
import { fetchInternships } from "./services/api";

function App() {
  const [internships, setInternships] = useState([]);
  const [error, setError]= useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInternships()
      .then((data) => {
        setInternships(data);
        console.log("✅ Sample internship object:", data[0]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-10 text-blue-500">Loading...</p>;
  if (error) return <p className="p-10 text-red-500">Error: {error}</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        ✅ Fetched {internships.length} internships
      </h1>
      {/* Print raw first internship to understand the data shape */}
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(internships[0], null, 2)}
      </pre>
    </div>
  );
}

export default App;