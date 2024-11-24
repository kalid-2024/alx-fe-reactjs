import { Link } from 'react-router-dom';
import  useRecipeStore  from './recipeStore';

const RecipeList = () => {
  const filteredRecipes= useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
    {filteredRecipes.length > 0 ? (
      filteredRecipes.map((recipe) => (
        <div key={recipe.id} style={{ marginBottom: '20px' }}>
          <h3>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p>{recipe.description}</p>
        </div>
      ))
      
    ):(
        <p>No recipes found.</p>
    )}
    </div>
  )
};

export default RecipeList;
