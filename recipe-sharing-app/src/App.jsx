import React from 'react';
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';

const App = () => {
  return (

    <Router>
      <Routes>
        <div style={{ padding: '20px' }}>
          <h1>Recipe Sharing Application</h1>
          <SearchBar />
          <Route path="/" element={<RecipeList />} /> 
          <Route path="/add" element={<AddRecipeForm />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </div>
      </Routes>
    </Router>
  );
};

export default App;
