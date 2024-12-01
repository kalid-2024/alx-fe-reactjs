import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  

  return (
    <Router>
      <h1>Hello World!</h1>

      <Routes>
          <Route path="/"  element={<App />} />
      </Routes>

    </Router>
  );
}

export default App
