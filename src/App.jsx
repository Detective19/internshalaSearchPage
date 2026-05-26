// src/App.jsx — Card preview test

import InternshipCard from "./components/InternshipCard";

const DUMMY_INTERNSHIP = {
  title: "Web Development Intern",
  company_name: "Google India Pvt Ltd",
  location_names: ["Bangalore", "Mumbai"],
  stipend: { salary: "15000" },
  duration: "3 Months",
  start_date: "Immediately",
  logo: null,
  is_remote: true,
  labels: ["Actively hiring", "Part time"],
};

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-sm mx-auto">
        <InternshipCard internship={DUMMY_INTERNSHIP} />
      </div>
    </div>
  );
}

export default App;