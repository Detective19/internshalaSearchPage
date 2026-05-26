// src/pages/Home.jsx

import { useEffect, useState } from "react";
import { fetchInternships } from "../services/api";
import InternshipList from "../components/InternshipList";

/**
 * Home page — owns all data fetching state.
 * Passes data down to InternshipList.
 * Filters will be added in the next task.
 */
function Home() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInternships()
  .then((data) => {
  setInternships(data);
  console.log("company_logo value:", data[0].company_logo); // ADD THIS
})
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── NAVBAR ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-blue-600 font-bold text-xl tracking-tight">
            Internshala
          </span>
          <span className="text-sm text-gray-500">
            Internship Search
          </span>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Internships
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Find the best internships matched for you
          </p>
        </div>

        {/* List — filters column will sit beside this in Task 5 */}
        <InternshipList
          internships={internships}
          loading={loading}
          error={error}
        />

      </main>
    </div>
  );
}

export default Home;