import React, { useState } from 'react';
import fetchUserData from '../services/githubService';


const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);
    try {
      const data = await fetchUserData(username);
      console.log(data);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }

    if (!username.trim()) {
        setError('Please enter a valid GitHub username');
        setLoading(false);
        return;
      }
  };

  return (
    <div >
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
        />
        <button
          type="submit"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {userData && (
        <div>
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s avatar`}
          />
          <h3>{userData.name || userData.login}</h3>
          <p>
            <a
              href={userData.html_url}
              target="_blank"
              rel=""
            >
              View GitHub Profile
            </a>
          </p>
        </div>
      )}
    </div>
  );

}

export default Search;

// const Search = () => {
//   const [searchParams, setSearchParams] = useState({
//     username: '',
//     location: '',
//     minRepos: '',
//   });
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasNextPage, setHasNextPage] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSearchParams((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setCurrentPage(1);

//     try {
//       const { users, links } = await fetchUserData({
//         ...searchParams,
//         page: 1,
//       });
//       setResults(users || []);
//       setHasNextPage(!!links.next);
//     } catch (err) {
//       setError(err.message || 'Something went wrong with your search.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoadMore = async () => {
//     if (!hasNextPage) return;
//     setLoading(true);

//     try {
//       const { users, links } = await fetchUserData({
//         ...searchParams,
//         page: currentPage + 1,
//       });
//       setResults((prev) => [...prev, ...users]);
//       setHasNextPage(!!links.next);
//       setCurrentPage((prev) => prev + 1);
//     } catch (err) {
//       setError('Error loading more results');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="advanced-search-container p-4">
//       <form
//   onSubmit={handleSubmit}
//   className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto"
// >
//   <input
//     type="text"
//     name="username"
//     value={searchParams.username}
//     onChange={handleChange}
//     placeholder="GitHub Username"
//     className="p-2 border rounded w-full"
//   />
//   <input
//     type="text"
//     name="location"
//     value={searchParams.location}
//     onChange={handleChange}
//     placeholder="Location"
//     className="p-2 border rounded w-full"
//   />
//   <input
//     type="number"
//     name="minRepos"
//     value={searchParams.minRepos}
//     onChange={handleChange}
//     placeholder="Minimum Repositories"
//     className="p-2 border rounded w-full"
//   />
//   <button
//     type="submit"
//     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//   >
//     Search
//   </button>
//       </form>

  
// {results.length > 0 && (
//   <ul className="results-list mt-4 w-full max-w-lg mx-auto">
//     {results.map((user) => (
//       <li
//         key={user.id}
//         className="p-4 border rounded mb-2 flex items-center"
//       >
//         <img
//           src={user.avatar_url}
//           alt={`${user.login}'s avatar`}
//           className="w-16 h-16 rounded-full"
//         />
//         <div className="ml-4">
//           <h3 className="text-lg font-bold">{user.login}</h3>
//           <p>Location: {user.location || 'N/A'}</p>
//           <p>Repositories: {user.repos || 'N/A'}</p>
//           <a
//             href={user.html_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             View GitHub Profile
//           </a>
//         </div>
//       </li>
//     ))}
//   </ul>
// )}

// {hasNextPage && (
//   <button
//     onClick={handleLoadMore}
//     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//   >
//     Load More
//   </button>
// )}

//   </div>
//   );
  
// }

// export default Search



