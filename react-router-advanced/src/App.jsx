import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import DynamicRouting from './components/userProfiles'

function App() {
  

  return (
    <Router>
      <h1>Hello World!</h1>

      <Routes>
          <Route path="/"  element={<App />} />
          <DynamicRouting/>
      </Routes>

    </Router>
  );
}

export default App
