import { useState } from "react";


const AddRecipeForm = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [errors, setErrors] = useState({});
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};
      if (!title) newErrors.title = 'Title is required';
      if (!ingredients) newErrors.ingredients = 'Ingredients are required';
      if (!instructions) newErrors.instructions = 'Instructions are required';
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;
  
      // Simulate form submission
      const newRecipe = {
        id: Date.now(),
        title,
        ingredients: ingredients.split('\n'),
        instructions
      };
      console.log('Submitted recipe:', newRecipe);
      setTitle('');
      setIngredients('');
      setInstructions('');
    };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full p-2 border rounded" 
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">Ingredients (one per line)</label>
            <textarea 
              value={ingredients} 
              onChange={(e) => setIngredients(e.target.value)} 
              className="w-full p-2 border rounded" 
            />
            {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients}</p>}
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">Instructions</label>
            <textarea 
              value={instructions} 
              onChange={(e) => setInstructions(e.target.value)} 
              className="w-full p-2 border rounded" 
            />
            {errors.instructions && <p className="text-red-500 text-sm">{errors.instructions}</p>}
          </div>
  
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
        </form>
      </div>
    );
  }

  export default AddRecipeForm