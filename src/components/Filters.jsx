// src/components/Filters.jsx

const STIPEND_OPTIONS = [
  { label: "Any", value: 0 },
  { label: "₹ 2,000+", value: 2000 },
  { label: "₹ 5,000+", value: 5000 },
  { label: "₹ 10,000+", value: 10000 },
  { label: "₹ 20,000+", value: 20000 },
];

const DURATION_OPTIONS = [
  "Any",
  "1 Month",
  "2 Months",
  "3 Months",
  "4 Months",
  "5 Months",
  "6 Months",
];

function Filters({ filters, setFilters, profiles, locations, onClose }) {

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      profile: "",
      location: "",
      duration: "Any",
      stipend: 0,
    });
  };

  const hasActiveFilters =
    filters.profile !== "" ||
    filters.location !== "" ||
    filters.duration !== "Any" ||
    filters.stipend !== 0;

  return (
    <aside className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-6 h-fit">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 text-base">Filters</h2>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-xs text-blue-600 hover:underline"
            >
              Clear all
            </button>
          )}
          {/* Close button — only shown inside mobile drawer */}
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              x
            </button>
          )}
        </div>
      </div>

      {/* FILTER 1: Profile */}
      <FilterSection title="Profile">
        <select
          value={filters.profile}
          onChange={(e) => handleChange("profile", e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Profiles</option>
          {profiles.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </FilterSection>

      {/* FILTER 2: Location */}
      <FilterSection title="Location">
        <select
          value={filters.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </FilterSection>

      {/* FILTER 3: Duration */}
      <FilterSection title="Duration">
        <div className="flex flex-col gap-2">
          {DURATION_OPTIONS.map((d) => (
            <label
              key={d}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="radio"
                name="duration"
                value={d}
                checked={filters.duration === d}
                onChange={(e) => handleChange("duration", e.target.value)}
                className="accent-blue-600"
              />
              {d}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* FILTER 4: Stipend */}
      <FilterSection title="Desired Stipend">
        <div className="flex flex-col gap-2">
          {STIPEND_OPTIONS.map((s) => (
            <label
              key={s.value}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="radio"
                name="stipend"
                value={s.value}
                checked={filters.stipend === s.value}
                onChange={() => handleChange("stipend", s.value)}
                className="accent-blue-600"
              />
              {s.label}
            </label>
          ))}
        </div>
      </FilterSection>

    </aside>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function FilterSection({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default Filters;