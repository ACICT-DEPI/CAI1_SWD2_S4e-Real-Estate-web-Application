import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query.trim());  
  };

  const handleSearchClick = () => {
    onSearch(searchQuery.trim()); 
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title, price, location..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyUp={handleInputChange} 
      />
      <button
        className="btn buttn"
        style={{ backgroundColor: "rgb(48, 48, 244)", color: "white", marginLeft: "30px" }}
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
}
