import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import DynamicRouting from './components/BlogPost'
import BlogPost from './components/BlogPost';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  

  return (
    <Router>
      <h1>Hello World!</h1>

      <Routes>
          <Route path="/"  element={<App />} />
          <Route path="/blog/:id"  element={<BlogPost/>} />
          <Route path="/profile"  element={<ProtectedRoute/>} />
              
      </Routes>

    </Router>
  );
}

export default App
