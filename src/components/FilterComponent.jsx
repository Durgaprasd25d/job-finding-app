import React from "react";

const FilterComponent = ({ filters, onFilterChange, onClearFilters, onSortChange }) => {
  return (
    <aside className="w-1/4 bg-white mt-5 shadow-lg p-4 rounded-lg sticky top-0 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Filters</h2>

      {/* Title Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">Title</h3>
        <div className="space-y-2">
          {["DevOps Engineer", "Cybersecurity", "Data Scientist", "UX Designer", "Fullstack"].map((title) => (
            <label className="flex items-center" key={title}>
              <input
                type="radio"
                className="form-radio"
                name="title"
                checked={filters.title === title}
                onChange={() => onFilterChange("title", title)}
              />
              <span className="ml-2">{title}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">Location</h3>
        <div className="space-y-2">
          {["Seattle", "Chicago", "Washington D.C."].map((location) => (
            <label className="flex items-center" key={location}>
              <input
                type="radio"
                className="form-radio"
                name="location"
                checked={filters.location === location}
                onChange={() => onFilterChange("location", location)}
              />
              <span className="ml-2">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Company Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">Company</h3>
        <div className="space-y-2">
          {["Jp Morgan", "TCS", "Business Solutions"].map((company) => (
            <label className="flex items-center" key={company}>
              <input
                type="radio"
                className="form-radio"
                name="company"
                checked={filters.company === company}
                onChange={() => onFilterChange("company", company)}
              />
              <span className="ml-2">{company}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">Salary Range</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Min Salary:
            <input
              type="number"
              value={filters.salaryMin}
              onChange={(e) => onFilterChange("salaryMin", e.target.value)}
              className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Salary:
            <input
              type="number"
              value={filters.salaryMax}
              onChange={(e) => onFilterChange("salaryMax", e.target.value)}
              className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            />
          </label>
        </div>
      </div>

      {/* Sort by Salary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">Sort by Salary</h3>
        <div className="space-y-2">
          <button
            onClick={() => onSortChange("salary", "ascending")}
            className={`w-full py-2 rounded-lg mb-2 ${
              filters.sortField === "salary" && filters.sortOrder === "ascending" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Ascending ↑
          </button>
          <button
            onClick={() => onSortChange("salary", "descending")}
            className={`w-full py-2 rounded-lg ${
              filters.sortField === "salary" && filters.sortOrder === "descending" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Descending ↓
          </button>
        </div>
      </div>

      {/* Sort by Freshness or Relevance */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">Sort by</h3>
        <div className="space-y-2">
          <button
            onClick={() => onSortChange("freshness")}
            className={`w-full py-2 rounded-lg mb-2 ${
              filters.sortField === "freshness" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Freshness
          </button>
          <button
            onClick={() => onSortChange("relevance")}
            className={`w-full py-2 rounded-lg ${
              filters.sortField === "relevance" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Relevance
          </button>
        </div>
      </div>

      <button
        onClick={onClearFilters}
        className="w-full bg-red-500 text-white py-2 rounded-lg mb-6"
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default FilterComponent;
