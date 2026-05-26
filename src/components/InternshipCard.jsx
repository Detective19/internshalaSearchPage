// src/components/InternshipCard.jsx

import { useState } from "react";
import { DollarSign, Clock, MapPin } from "lucide-react";

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
    part_time,
    labels,
    posted_on,
    profile_name,
    is_ppo,
  } = internship;

  const [logoError, setLogoError] = useState(false);

  const logoUrl = company_logo
    ? company_logo.startsWith("http")
      ? company_logo
      : `https://internshala-uploads.internshala.com/logo/${company_logo}`
    : null;

  const getInitials = (name) => {
    if (!name) return "?";
    const cleaned = name.replace(/\(.*?\)/g, "").trim();
    return cleaned
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  const stipendText = () => {
    const salary = stipend?.salary;
    if (!salary || salary === "Unpaid") return "Unpaid";
    const cleaned = String(salary)
      .replace(/₹/g, "")
      .replace(/\/month/gi, "")
      .trim();
    return `₹ ${cleaned} /month`;
  };

  const getLabelText = (l) => {
    if (!l) return "";
    if (typeof l === "string") return l;
    if (typeof l === "object") {
      return String(l.label_mobile ?? l.label_value ?? l.labels_app ?? "");
    }
    return String(l);
  };

  const safeLabels = Array.isArray(labels) ? labels : [];

  const activelyHiringText = (() => {
    const found = safeLabels.find((l) =>
      getLabelText(l).toLowerCase().includes("actively")
    );
    return found ? getLabelText(found) : "";
  })();

  const otherLabels = safeLabels.filter(
    (l) => !getLabelText(l).toLowerCase().includes("actively")
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
      <div className="p-5 flex flex-col gap-4">

        {/* HEADER: Title + Company + Logo */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1">
              {title}
            </h3>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm text-gray-600 truncate">
                {company_name}
              </span>
              {activelyHiringText && (
                <span className="inline-flex text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-sm border border-green-200 font-medium">
                  {activelyHiringText}
                </span>
              )}
              {is_ppo && (
                <span className="inline-flex text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded-sm border border-purple-200 font-medium">
                  PPO
                </span>
              )}
            </div>
          </div>

          {/* Logo */}
          {logoUrl && !logoError ? (
            <img
              src={logoUrl}
              alt={`${company_name} logo`}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-gray-200 shadow-sm"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white font-semibold text-sm">
                {getInitials(company_name)}
              </span>
            </div>
          )}
        </div>

        {/* METADATA ROW: Stipend, Duration, Location */}
        <div className="flex items-center gap-3 text-xs text-gray-700 pb-3 border-b border-gray-100 overflow-x-auto">
          <div className="flex items-center gap-1 flex-shrink-0">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="font-medium whitespace-nowrap">{stipendText()}</span>
          </div>
          <span className="text-gray-300 flex-shrink-0">•</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-medium whitespace-nowrap">{duration || "N/A"}</span>
          </div>
          <span className="text-gray-300 flex-shrink-0">•</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="font-medium truncate">
              {work_from_home ? "Remote" : (location_names?.join(", ") || "Location")}
            </span>
          </div>
        </div>

        {/* START DATE (if available) */}
        {start_date && (
          <p className="text-xs text-gray-500 -my-1">
            {start_date.replace("Starts", "").trim()}
          </p>
        )}

        {/* TAGS/SKILLS */}
        {otherLabels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {otherLabels.map((label, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                {getLabelText(label).replace(/,/g, ", ")}
              </span>
            ))}
          </div>
        )}

        {/* FOOTER: Posted Date + Apply Button */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            {posted_on && (
              <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded border border-green-200 truncate font-medium">
                {posted_on === "Today" ? "Posted today" : `Posted ${posted_on}`}
              </span>
            )}
            {part_time && (
              <>
                <span className="text-gray-300">•</span>
                <span className="whitespace-nowrap">Part-time</span>
              </>
            )}
          </div>
          <button className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white text-xs font-semibold rounded-md transition-colors duration-150 flex-shrink-0">
            Apply now
          </button>
        </div>

      </div>
    </div>
  );
}

export default InternshipCard;