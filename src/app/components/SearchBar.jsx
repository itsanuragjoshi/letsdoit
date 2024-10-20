"use client";
import { useState, useRef } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "./Button";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
      setSearchTerm("");
    }
  };

  return (
    <div className="flex flex-1 items-center border border-gray-600 rounded-md">
      <form onSubmit={handleSubmit} className="flex-grow">
        <input
          type="search"
          placeholder="Search tasks"
          className="w-full px-3 py-2 border-none outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={searchInputRef}
        />
      </form>
      <Button
        variant="link"
        size="small"
        icon={SearchIcon}
        showText={false}
        onClick={handleSubmit}
        aria-label="Search"
        title="Search"
        text="Search"
      />
    </div>
  );
};

export default SearchBar;
