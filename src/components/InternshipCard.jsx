// src/components/InternshipCard.jsx

const DEFAULT_LOGO =
  "https://internshala.com/static/images/common/internshala_og_image.png";

// DetailItem is intentionally kept in this file — only used by InternshipCard
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
    location_names,
    stipend,
    duration,
    start_date,
    logo,
    is_remote,
    labels = [],
  } = internship;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col gap-3">

      {/* TOP ROW: Logo + Title + Company */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <img
            src={logo || DEFAULT_LOGO}
            alt={`${company_name} logo`}
            className="w-12 h-12 object-contain rounded border border-gray-100 p-1"
            onError={(e) => {
              e.target.src = DEFAULT_LOGO;
            }}
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-base leading-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">{company_name}</p>
          </div>
        </div>

        {/* Remote badge */}
        {is_remote && (
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
              {label}
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
            is_remote
              ? "Remote"
              : location_names?.join(", ") || "Not specified"
          }
        />
        <DetailItem
          icon="💰"
          label={stipend?.salary ? `₹ ${stipend.salary}/month` : "Unpaid"}
        />
        <DetailItem icon="🗓️" label={start_date || "Not specified"} />
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