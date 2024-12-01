import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';

// Component that displays user information based on URL parameter
const User = () => {
    // useParams hook is used to access route parameters
    const { userId } = useParams();
    return <h3>User ID: {userId}</h3>;
};

const DynamicRouting = () => (
    <Router>
        <div>
            <nav>
                <Link to="/user/1">User 1</Link>
                <Link to="/user/2">User 2</Link>
            </nav>
            <Switch>
                {/* Dynamic route with a userId parameter */}
                <Route path="/user/:userId" component={User} />
                {/* Default route to Home component */}
                <Route path="/">
                    <h2>Home</h2>
                </Route>
            </Switch>
        </div>
    </Router>
);

export default DynamicRouting;