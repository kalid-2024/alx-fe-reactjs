import axios from 'axios';

const fetchUserData = async ({ username, location, minRepos }) => {
  let query = '';

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${query.trim()}`;

  const response = await axios.get(url);
  return response.data;
};

export default fetchUserData