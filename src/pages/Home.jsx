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
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchInternships()
      .then((data) => {
        setInternships(data);
        console.log(data[0]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Count active filters for badge
  const activeFilterCount = [
    filters.profile !== "",
    filters.location !== "",
    filters.duration !== "Any",
    filters.stipend !== 0,
  ].filter(Boolean).length;

  const profiles = useMemo(() => {
    const all = internships.map((i) => i.profile_name).filter(Boolean);
    return [...new Set(all)].sort();
  }, [internships]);

  const locations = useMemo(() => {
    const all = internships.flatMap((i) => i.location_names || []).filter(Boolean);
    return [...new Set(all)].sort();
  }, [internships]);

  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      if (filters.profile && internship.profile_name !== filters.profile)
        return false;

      if (filters.location) {
        const hasLocation = internship.location_names?.includes(filters.location);
        const isRemote = internship.work_from_home;
        if (!hasLocation && !isRemote) return false;
      }

      if (filters.duration && filters.duration !== "Any") {
        if (internship.duration !== filters.duration) return false;
      }

      if (filters.stipend > 0) {
        const salary = parseInt(
          String(internship.stipend?.salary || "0").replace(/[^0-9]/g, ""),
          10
        );
        if (salary < filters.stipend) return false;
      }

      return true;
    });
  }, [internships, filters]);

  const filterProps = {
    filters,
    setFilters,
    profiles,
    locations,
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <img
  src="https://internshala.com/static/images/common/internshala_logo.svg"
  alt="Internshala"
  className="h-8 object-contain"
  onError={(e) => {
    e.target.style.display = "none";
  }}
/>
          <span className="text-sm text-gray-500 hidden sm:block">
            Internship Search
          </span>
        </div>
      </header>

      {/* MOBILE FILTER DRAWER OVERLAY */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* MOBILE DRAWER PANEL */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-white z-40 shadow-xl transform transition-transform duration-300 lg:hidden overflow-y-auto
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4">
          <Filters
            {...filterProps}
            onClose={() => setDrawerOpen(false)}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* Page heading + mobile filter button */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Internships</h1>
            <p className="text-sm text-gray-500 mt-1">
              Find the best internships matched for you
            </p>
          </div>

          {/* Mobile filter trigger — hidden on desktop */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm flex-shrink-0"
          >
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* SIDEBAR + LIST LAYOUT */}
        <div className="flex gap-6 items-start">

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0 sticky top-20">
            <Filters {...filterProps} />
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