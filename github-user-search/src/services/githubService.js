import axios from "axios";


const constructQuery = (username, location, minRepos) => {
    let query = "";
    if (username) query += `user:${username} `;
    if (location) query += `location:${location} `;
    if (repos) query += `repos:>${minRepos}`;
    return query.trim();
  };
  
export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

export const fetchAdvancedSearchResults = async (query, page = 1) => {
    const response = await axios.get(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=30`);
    return response.data.items;
  };
  