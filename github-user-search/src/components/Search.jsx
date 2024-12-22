import React, { useState } from 'react';
import fetchUserData  from '../services/githubService';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const data = await fetchUserData(searchParams);
      setResults(data.items || []);
    } catch (err) {
      setError('Something went wrong with your search.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="advanced-search-container p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <input
          type="text"
          name="username"
          value={searchParams.username}
          onChange={handleChange}
          placeholder="GitHub Username"
          className="p-2 border rounded w-full max-w-md"
        />
        <input
          type="text"
          name="location"
          value={searchParams.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 border rounded w-full max-w-md"
        />
        <input
          type="number"
          name="minRepos"
          value={searchParams.minRepos}
          onChange={handleChange}
          placeholder="Minimum Repositories"
          className="p-2 border rounded w-full max-w-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-blue-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {results.length > 0 && (
        <ul className="results-list mt-4 w-full max-w-md">
          {results.map((user) => (
            <li
              key={user.id}
              className="p-4 border rounded mb-2 flex items-center"
            >
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-16 h-16 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-bold">{user.login}</h3>
                <p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View GitHub Profile
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default Search;
