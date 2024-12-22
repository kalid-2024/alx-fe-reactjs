import axios from 'axios';


const fetchUserData = async ({ username, location, minRepos, page = 1 }) => {
  let query = [];

  if (username) query.push(`${username} in:login`);
  if (location) query.push(`location:${location}`);
  if (minRepos) query.push(`repos:>=${minRepos}`);

  const apiUrl = `https://api.github.com/search/users?q=${query.join(
    '+'
  )}&page=${page}&per_page=30`;

  const response = await axios.get(apiUrl);
  const { data, headers } = response;

  const links = headers.link
    ? headers.link.split(',').reduce((acc, link) => {
        const match = link.match(/<(.*?)>; rel="(.*?)"/);
        if (match) acc[match[2]] = match[1];
        return acc;
      }, {})
    : {};

  return { users: data.items, total_count: data.total_count, links };
};


export default fetchUserData;


