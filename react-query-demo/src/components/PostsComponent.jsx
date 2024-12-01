import { useQuery } from 'react-query';

// Define a fetch function that can be used to fetch data from an API
const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
};

const PostsComponent = () => {
    // Use the useQuery hook to handle data fetching and caching
    const { data, isError, isLoading } = useQuery('fetchPosts', fetchPosts, 
        {
        staleTime: 5 * 60 * 1000, // 5 minutes - data is considered fresh for 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes - data remains in cache for 10 minutes
        refetchOnWindowFocus: false, // Prevent refetching when the window regains focus
        keepPreviousData: true, // Keep previous data while fetching new data
    });

    // Handle loading state
    if (isLoading) return <div>Loading...</div>;
    // Handle error state
    if (isError) return <div>Error loading data</div>;

    // Render the fetched data
    return (
        <div>
            {data.map(item => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
};

export default PostsComponent;