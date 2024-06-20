import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch, initialValue }) => {
  const [searchValue, setSearchValue] = useState(initialValue || "");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchValue.trim());
    }
  };

  const handleSearchClick = () => {
    onSearch(searchValue.trim());
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex items-center border rounded-lg overflow-hidden">
      <input
        type="text"
        className="py-2 px-4 outline-none"
        placeholder="Search..."
        value={searchValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-primary hover:bg-primary-dark focus:bg-primary-dark text-white px-4 py-2"
        onClick={handleSearchClick}
        style={{ color: "#ffffff" }} // Set the color to white (#ffffff)
      >
        <span role="img" aria-label="search" style={{ color: "#ffffff" }}>🔍</span>
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  initialValue: PropTypes.string
};

export default SearchBar;
