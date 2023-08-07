import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    onSearch(query);
  };
  return (
    <div className="flex justify-center align-center mt-2">
      <div className="flex items-center border rounded p-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="border-none focus:outline-none bg-slate-100 ml-2"
        />
        <FaSearch onClick={handleSearch} className="text-gray-500 mr-2" />
      </div>
    </div>
  );
}

export default SearchBar;
