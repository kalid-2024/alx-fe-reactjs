import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import DynamicRouting from './components/BlogPost'
import BlogPost from './components/BlogPost';

function App() {
  

  return (
    <Router>
      <h1>Hello World!</h1>

      <Routes>
          <Route path="/"  element={<App />} />
          <Route path="/blog/:id"  element={<BlogPost/>} />
              
      </Routes>

    </Router>
  );
}

export default App
