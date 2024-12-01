import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Function that checks if the user is authenticated
const useAuth = () => {
    // Replace with your authentication logic, for instance checking if a token exists in local storage
    return localStorage.getItem('authToken') !== null;
};

// Custom Route component that checks for authentication
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            useAuth() ? (
                // If authenticated, render the component
                <Component {...props} />
            ) : (
                // If not authenticated, redirect to the login page
                <Navigate to="/login" />
            )
        }
    />
);

const ProtectedRoute = () => (
    <Router>
        <div>
            <Switch>
                {/* Public route to Login component */}
                <Route path="/login" component={Login} />
                {/* Protected route to Dashboard component */}
                <PrivateRoute path="/dashboard" component={Dashboard} />
                 {/* Protected Route to Profile */}
                <PrivateRoute path="/profile" component={Profile} />
                {/* Default route to Home component */}
                <Route path="/">
                    <h2>Home</h2>
                </Route>
            </Switch>
        </div>
    </Router>
);

// Simple Login component
const Login = () => {
    const handleLogin = () => {
        // Logic to handle login, e.g., setting authentication token in local storage
        localStorage.setItem('authToken', 'your-token');
        window.location.href = '/profile'; // Redirect to the Profile page after login
    };

    return <button onClick={handleLogin}>Login</button>;
};

// Simple Dashboard component
const Dashboard = () => <h2>Dashboard</h2>;

export default ProtectedRoute;