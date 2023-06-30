import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCookies } from "react-cookie";


export const Home = () => {
  const [recipes, setRecipes] = useState([]); //keep track of all recipes from database
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const [savedBtnClicked, isSavedBtnClicked] = useState(false);
  const userID = useGetUserID();

  useEffect(() => {
    //get recipes; t will be called whenever the component is rendered

    const fetchRecipe = async () => {
      try {
        const response = await axios.get("https://mern-recipe-api.onrender.com/recipes"); //send the data in this form by POST request for the recipe route
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          //send the data in this form by POST request for the recipe route
          `https://mern-recipe-api.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
    fetchSavedRecipe();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://mern-recipe-api.onrender.com/recipes", 
      {
        recipeID,
        userID,
      }, 
      { headers: { authorization: cookies.access_token}}
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const isBtnSaveClicked = () => {
    isSavedBtnClicked(!savedBtnClicked);
  };

  const isLoggedIn = () => {
    if (!cookies.access_token) alert("You must be logged int to save recipes!");
  }

  return (
    <div>
      {
        !cookies.access_token ?
        <div className="bg-orange-200 flex items-center justify-center">
          <p className="text-center">Log in to <strong> create your recipes </strong>, <strong> share with others </strong> and have your own <strong> favourite recipes page </strong></p>
        </div>
        :
        <></>
      }
      <h1 className="text-center text-3xl mb-6 md:text-4xl md:mb-8 lg:text-5xl lg:mb-10">
        Recipes
      </h1>
      <ul className="flex flex-col items-center justify-center">
        {recipes.map((recipe) => (
          <li
            key={recipe._id}
            className="mb-10 mx-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow"
          >
            <div className="flex items-center justify-center">
              <h2 className="font-bold text-center text-xl my-4 md:text-2xl md:my-6 lg:text-3xl lg:my-8">
                {recipe.name}
              </h2>
            </div>
            <div>
              <p className="text-center mb-2 md:text-lg lg:text-2xl">
                {recipe.description}
              </p>
            </div>
            <div className="mb-8">
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="object-cover h-max-100 w-max-160"
              />
            </div>
            <div className="pl-6 m-3">
              <p className="text-lg underline m-2 md:text-2xl">Ingredients</p>
              <ul>
                {recipe.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="list-disc md:text-lg leading-7"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pl-6 m-3">
              <p className="text-md italic mt-6 mb-2">Instructions</p>
              <p className="mt-2">{recipe.instructions}</p>
            </div>
            <div>
              <p className="text-center m-8">
                Cooking time: {recipe.cookingTime} minutes
              </p>
            </div>
            <div className="flex flex-col items-center justify-center m-6">
              <button
                onClick={() => {
                  isLoggedIn();
                  saveRecipe(recipe._id);
                  isBtnSaveClicked();
                }}
                className={`${isBtnSaveClicked ? "disable" : "block"}`}
              >
                {(savedRecipes || []).includes(recipe._id) ? (
                <div>
                  <p>Saved</p>
                  <FavoriteIcon />
                </div>
              ) : (
                <div>
                  <p>Save</p>
                  <FavoriteBorderIcon />
                </div>
              )}
              
              </button>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
