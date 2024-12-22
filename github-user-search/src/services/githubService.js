import axios from 'axios';

export const fetchUserData = async (username) => {
  const url = `https://api.github.com/users/${username}`; // Correctly insert username
  const response = await axios.get(url);
  return response.data;
};

export default fetchUserData