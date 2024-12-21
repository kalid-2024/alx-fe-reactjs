import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'



function App() {
  

  return (
    <>
  <Router>
    <div>
      <header>
        <h1>
      Hello World!
        </h1>
        <nav>

        </nav>
      </header>


      <main>
        <Routes>
          <Route path="/" element />
          
        </Routes>
      </main>

      <footer>
      <p>&copy; 2024 GitHub User Search APP  All rights reserved. </p>
      </footer>

    </div>
  </Router>
    </>
  )
}

export default App
