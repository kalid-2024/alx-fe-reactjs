import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom';

// Dashboard component that contains nested routes
const Dashboard = () => {
    // useRouteMatch provides the current URL and path
    let { path, url } = useRouteMatch();

    return (
        <div>
            <h2>Dashboard</h2>
            <ul>
                <li>
                    <Link to={`${url}/ProfileDetails`}>ProfileDetails</Link>
                </li>
                <li>
                    <Link to={`${url}/ProfileSettings`}>ProfileSettings</Link>
                </li>
            </ul>

            {/* Nested routes within the Dashboard component */}
            <Switch>
                {/* Default route that displays a message */}
                <Route exact path={path}>
                    <h3>Please select an option.</h3>
                </Route>
                {/* Nested route for Profile */}
                <Route path={`${path}/ProfileDetails`}>
                    <Profile />
                </Route>
                {/* Nested route for Settings */}
                <Route path={`${path}/ProfileSettings`}>
                    <Settings />
                </Route>
            </Switch>
        </div>
    );
};

// Profile component
const ProfileDetails = () => <h3>ProfileDetails</h3>;

// Settings component
const ProfileSettings = () => <h3>ProfileSettings</h3>;

const NestedRoutes = () => (
    <Router>
        <div>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
            </nav>
            <Switch>
                {/* Route to Dashboard component */}
                <Route path="/dashboard" component={Dashboard} />
                {/* Default route to Home component */}
                <Route path="/">
                    <h2>Home</h2>
                </Route>
            </Switch>
        </div>
    </Router>
);

export default NestedRoutes;