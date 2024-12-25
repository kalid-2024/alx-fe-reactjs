import React, { useState } from "react";
import { fetchAdvancedSearchResults } from "../services/githubService";



const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const constructQuery = () => {
    let query = "";
    if (username) query += `user:${username} `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>${minRepos}`;
    return query.trim();
  };

  const handleSearch = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const query = constructQuery();
      const response = await fetchAdvancedSearchResults(query, page);
      setResults(response.items);
      setTotalCount(response.total_count);
      setCurrentPage(page);
    } catch (err) {
      setError("Error fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(1); // Start from the first page
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Minimum repositories"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {results.length > 0 && (
        <div>
          <p className="mt-4">Total Results: {totalCount}</p>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {results.map((user) => (
              <div key={user.id} className="border p-4 rounded shadow">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full"
                />
                <p>{user.login}</p>
                <p>Location: {user.location || "N/A"}</p>
                <p>Repositories: {user.public_repos || "N/A"}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handleSearch(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-500 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => handleSearch(currentPage + 1)}
              disabled={results.length < 30}
              className="bg-gray-500 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
