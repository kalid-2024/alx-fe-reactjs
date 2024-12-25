import axios from "axios";

export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

export const fetchAdvancedSearchResults = async (query, page = 1) => {
    const response = await axios.get(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=30`);
    return response.data.items;
  };
  