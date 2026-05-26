// src/components/InternshipCard.jsx

import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
function DetailItem({ icon, label }) {
  return (
    <div className="flex items-center gap-1.5 text-gray-600">
      <span className="text-base">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}

function InternshipCard({ internship }) {
  const {
    title,
    company_name,
    company_logo,
    location_names,
    stipend,
    duration,
    start_date,
    work_from_home,
    labels = [],
  } = internship;

  const [logoError, setLogoError] = useState(false);

  // Correct Internshala logo CDN path
  const logoUrl = company_logo
    ? company_logo.startsWith("http")
      ? company_logo
      : `https://internshala-uploads.internshala.com/logo/${company_logo}`
    : null;

  // Company initials fallback
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  // Clean stipend
const stipendText = () => {
  const salary = stipend?.salary;
  if (!salary || salary === "Unpaid") return "Unpaid";
  // Remove ₹ and /month — we'll add our own clean format
  const cleaned = String(salary)
    .replace(/₹/g, "")
    .replace(/\/month/gi, "")
    .trim();
  return `₹ ${cleaned}/month`;
};

  // Clean start date
  const startDateText = start_date
    ? start_date.replace("Starts", "").trim()
    : "Not specified";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col gap-3">

      {/* TOP ROW: Logo + Title + Company */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">

          {/* Logo or Initials Avatar */}
          {logoUrl && !logoError ? (
            <img
              src={logoUrl}
              alt={`${company_name} logo`}
              className="w-12 h-12 object-contain rounded border border-gray-100 p-1 flex-shrink-0"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-12 h-12 rounded border border-gray-100 flex-shrink-0 bg-blue-50 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">
                {getInitials(company_name)}
              </span>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 text-base leading-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">{company_name}</p>
          </div>
        </div>

        {/* Remote badge */}
        {work_from_home && (
          <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full whitespace-nowrap">
            Remote
          </span>
        )}
      </div>

      {/* LABELS */}
      {labels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {labels.map((label, index) => (
            <span
              key={index}
              className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full"
            >
              {label?.label_value || label?.label_mobile || ""}
            </span>
          ))}
        </div>
      )}

      <hr className="border-gray-100" />

      {/* DETAILS GRID */}
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <DetailItem
          icon="📍"
          label={
            work_from_home
              ? "Remote"
              : location_names?.join(", ") || "Not specified"
          }
        />
        <DetailItem icon="💰" label={stipendText()} />
        <DetailItem icon="🗓️" label={startDateText} />
        <DetailItem icon="⏱️" label={duration || "Not specified"} />
      </div>

      {/* APPLY BUTTON */}
      <button className="mt-1 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-200">
        Apply Now
      </button>

    </div>
  );
}

export default InternshipCard;