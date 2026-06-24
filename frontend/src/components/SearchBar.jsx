import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="card mt-3">
      <div className="card-header bg-info">
        <h3>Search by Name</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="search-form">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-info">Search</button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
