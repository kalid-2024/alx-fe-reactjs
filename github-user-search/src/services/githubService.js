import axios from 'axios';

// const apiKey = process.env.REACT_APP_GITHUB_API_KEY

const fetchUserData = async (username)=> {

    try {
        const response = await axios.get('https://api.github.com/users/{username}');
        return response.json();
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }

    }

    export default fetchUserData