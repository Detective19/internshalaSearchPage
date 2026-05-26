// src/components/InternshipList.jsx

import InternshipCard from "./InternshipCard";

function InternshipList({ internships, loading, error }) {

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">warning</span>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          Failed to load internships
        </h3>
        <p className="text-sm text-gray-400">{error}</p>
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">search</span>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          No internships found
        </h3>
        <p className="text-sm text-gray-400">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-700">
          {internships.length}
        </span>{" "}
        internships
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {internships.map((internship) => (
          <InternshipCard
            key={internship.id}
            internship={internship}
          />
        ))}
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <hr className="border-gray-100" />
      <div className="grid grid-cols-2 gap-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-3 bg-gray-100 rounded w-4/5" />
        ))}
      </div>
      <div className="h-9 bg-gray-200 rounded-lg mt-1" />
    </div>
  );
}

export default InternshipList;