import React from 'react';
import { useParams } from 'react-router-dom';
import { useState ,useEffect } from 'react';



const RecipeDetail = () => {
 
  const { id } = useParams(); // Get recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch('/src/data.json'); // Replace with the actual path to the data.json file
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const selectedRecipe = data.find(recipe => recipe.id === parseInt(id));
        setRecipe(selectedRecipe);
      } catch (error) {
        console.error('Error fetching the recipe details:', error);
      }
    };

    fetchRecipeDetail();

  }, [id]); // Re-fetch when the id changes

  if (!recipe) {
    return <p>Loading recipe details...</p>;
  }

  return (
    <div className="p-4 shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-4"/>
      <h2 className="text-xl font-bold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index} className="text-gray-700">{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-xl text-blue-800 my-4 sm:text-lg md:text-xl hover:text-blue-500">Instructions</h2>
      <p className="text-gray-600 text-base sm:text-sm md:text-base">{recipe.instructions}</p>
    </div>
  );
}
  


export default RecipeDetail