import axios from 'axios';



const fetchUserData = async ({ username, location, minRepos, page = 1 }) => {
  let query = '';

  // Add username to the query
  if (username) {
    query += `${username} in:login`;
  }

  // Add location to the query
  if (location) {
    query += ` location:${location}`;
  }

  // Add minimum repository count to the query
  if (minRepos) {
    query += ` repos:>${minRepos}`;
  }

  // GitHub API URL with query and pagination parameters
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=30`;

  try {
    const response = await axios.get(url);
    const { data, headers } = response;

    // Parse the Link header for pagination information
    const links = headers.link
      ? headers.link.split(',').reduce((acc, link) => {
          const match = link.match(/<(.*?)>; rel="(.*?)"/);
          if (match) acc[match[2]] = match[1];
          return acc;
        }, {})
      : {};

    return { users: data.items, total_count: data.total_count, links };
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    } else {
      throw new Error('Failed to fetch data. Please try again.');
    }
  }
};


export default fetchUserData