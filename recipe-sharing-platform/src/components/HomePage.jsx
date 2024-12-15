import React from 'react'
import {useState,useEffect} from 'react'

const HomePage = () => {

    const[recipes,setRecipes] = useState([]);

    useEffect(()=>{

        const fetchData = async ()=>{
            try{
                const response = await fetch('/src/data.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                const data = await response.json();
                setRecipes(data);

            }catch(error){
                console.error('Error fetching the recipe data:', error);
            }
        };
        fetchData();

    }, [])

  return (
    <div>
        <h1>HomePage</h1>
        {recipes.length ===0?(<p>Loading Recipes...</p>):(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    recipes.map((recipe)=>(
                        <div key={recipe.id} className="bg-gray-100 p-8 max-w-sm mx-auto, my-20 rounded-lg shadow-lg sm:p-4 md:p-8 sm:max-w-xs md:max-w-sm hover:shadow-xl">
                            <img src={recipe.image} alt={recipe.title}  className="rounded-full w-36 h-36 mx-auto sm:w-24 h-24 md:w-36 h-36  hover:scale-110  transition-transform duration-300 ease-in-out"/>
                            <h2 className="text-xl text-blue-800 my-4 sm:text-lg md:text-xl hover:text-blue-500">{recipe.title}</h2>
                            <p className="text-gray-600 text-base sm:text-sm md:text-base">{recipe.summary}</p>
                        </div>
                    ))
                }
            </div>
        )}
    </div>
  );
}

export default HomePage