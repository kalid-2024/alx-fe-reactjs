import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';

// Component that displays blog information based on URL parameter
const Blog = () => {
    // useParams hook is used to access route parameters
    const { blogId } = useParams();
    return <h3>Blog ID: {blogId}</h3>;
};

const BlogPost = () => (
    <Router>
        <div>
            <nav>
                <Link to="/blog/1">Blog 1</Link>
                <Link to="/blog/2">Blog 2</Link>
            </nav>
            <Switch>
                {/* Dynamic route with a blogId parameter */}
                <Route path="/blog/:blogId" component={Blog} />
                {/* Default route to Home component */}
                <Route path="/">
                    <h2>Home</h2>
                </Route>
            </Switch>
        </div>
    </Router>
);

export default BlogPost;