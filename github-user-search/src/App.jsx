import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Search from './components/Search'


function App() {
  

  return (
    <>
  <Router>
    <div>
      <header>
        <h1>
        GitHub User Search Application!!!
        </h1>
        <nav>

        </nav>
      </header>


      <main>
        <Routes>
          <Route path="/Search" element={<Search/>} />
          
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
