// src/pages/Home.jsx

import { useEffect, useState, useMemo } from "react";
import { fetchInternships } from "../services/api";
import InternshipList from "../components/InternshipList";
import Filters from "../components/Filters";

const DEFAULT_FILTERS = {
  profile: "",
  location: "",
  duration: "Any",
  stipend: 0,
};

function Home() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    fetchInternships()
      .then((data) => setInternships(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Derive unique profiles from API data
  const profiles = useMemo(() => {
    const all = internships
      .map((i) => i.profile_name)
      .filter(Boolean);
    return [...new Set(all)].sort();
  }, [internships]);

  // Derive unique locations from API data
  const locations = useMemo(() => {
    const all = internships
      .flatMap((i) => i.location_names || [])
      .filter(Boolean);
    return [...new Set(all)].sort();
  }, [internships]);

  // Apply all filters
  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {

      // Profile filter
      if (
        filters.profile &&
        internship.profile_name !== filters.profile
      ) {
        return false;
      }

      // Location filter
      if (filters.location) {
        const hasLocation = internship.location_names?.includes(
          filters.location
        );
        const isRemote = internship.work_from_home;
        if (!hasLocation && !isRemote) return false;
      }

      // Duration filter
      if (filters.duration && filters.duration !== "Any") {
        if (internship.duration !== filters.duration) return false;
      }

      // Stipend filter
      if (filters.stipend > 0) {
        const salary = parseInt(
          String(internship.stipend?.salary || "0")
            .replace(/[^0-9]/g, ""),
          10
        );
        if (salary < filters.stipend) return false;
      }

      return true;
    });
  }, [internships, filters]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-blue-600 font-bold text-xl tracking-tight">
            Internshala
          </span>
          <span className="text-sm text-gray-500">Internship Search</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Internships</h1>
          <p className="text-sm text-gray-500 mt-1">
            Find the best internships matched for you
          </p>
        </div>

        {/* SIDEBAR + LIST LAYOUT */}
        <div className="flex gap-6 items-start">

          {/* Sidebar — hidden on mobile, visible on large screens */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <Filters
              filters={filters}
              setFilters={setFilters}
              profiles={profiles}
              locations={locations}
            />
          </div>

          {/* Internship List */}
          <div className="flex-1 min-w-0">
            <InternshipList
              internships={filteredInternships}
              loading={loading}
              error={error}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;