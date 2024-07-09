import { useState } from "react";

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch(""); // Reset search term in parent component
  };

  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mr-2 rounded"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Search
      </button>
      {searchTerm && (
        <button
          onClick={handleClear}
          className="text-red-500 hover:text-red-700 focus:outline-none ml-5"
          title="Clear search"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
