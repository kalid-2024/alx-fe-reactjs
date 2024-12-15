import { useState } from "react";


function AddRecipeForm() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [steps, setSteps] = useState('');
    const [errors, setErrors] = useState({});
  
    // Centralized validation function
    const validate = () => {
      const newErrors = {};
      if (!title.trim()) newErrors.title = 'Title is required';
      if (!ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
      if (!instructions.trim()) newErrors.instructions = 'Instructions are required';
      if (!steps.trim()) newErrors.steps = 'Steps are required';
      return newErrors;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = validate();
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length > 0) return; // If errors exist, stop form submission
  
      // Simulate form submission
      const newRecipe = {
        id: Date.now(),
        title,
        ingredients: ingredients.split('\n'),
        instructions,
        steps: steps.split('\n')
      };
      console.log('Submitted recipe:', newRecipe);
      
      // Clear form after submission
      setTitle('');
      setIngredients('');
      setInstructions('');
      setSteps('');
    };
  
    return (
      <div className="p-4  shadow-lg " >
        <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
        <form onSubmit={handleSubmit} className="space-y-4  shadow-lg sm:p-4 md:p-8 sm:max-w-xs md:max-w-sm">
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
  
          <div>
            <label className="block text-sm font-medium mb-1">Steps (one per line)</label>
            <textarea 
              value={steps} 
              onChange={(e) => setSteps(e.target.value)} 
              className="w-full p-2 border rounded" 
            />
            {errors.steps && <p className="text-red-500 text-sm">{errors.steps}</p>}
          </div>
  
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
        </form>
      </div>
    );
  }
  

  export default AddRecipeForm