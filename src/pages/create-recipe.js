import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export const CreateRecipe = () => {
  const userID = useGetUserID(); //variable that stores the userID. It can be used elsewhere!
  const [cookies, _] = useCookies(["access_token"]);


  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    //every time the input is changed, it will be recorded
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    //every time the input is changed, it will be recorded
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] }); //it sets the recipe object to be the same as it was before (that is way the spread operator means), but whatever we put after the comma is going to change the object.
    // In this case, we are changing the ingredients field from the recipe object (see useState above). Initially will be an empty array, but as soon the ingredients are being added, the spread operator keeps the old ingredients and then add new ones
  };

  const onSubmit = async (event) => {
    //Send the form date to the API
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      }); //send the data in this form by POST request for the recipe route
      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-center">Create a Recipe</h2>

      <form onSubmit={onSubmit} className="flex flex-col items-center">
        <div className="mb-6 w-2/3">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Dish name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Lasagna"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6 w-2/3">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Delicious (and vegetarian) italian dish"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6 w-2/3">
          <label
            htmlFor="ingredients"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ingredients
          </label>

          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              id="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
              className="w-full mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mix of Vegetables"
              required
            />
          ))}

          <button
            type="button"
            className="mt-4 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={addIngredient}
          >
            Add
          </button>
        </div>
        <div className="mb-6 w-2/3">
          <label
            htmlFor="instructions"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Instructions
          </label>
          <textarea
            type="text"
            id="instructions"
            name="instructions"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Season all vegetables with salt and pepper. (...)"
            onChange={handleChange}
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-6 w-2/3">
          <label
            htmlFor="imageUrl"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image URL
          </label>
          <span className="text-sm">
            Use <a href="https://www.pexels.com/">Pexel.com</a> to grab a
            horizontal and high quality picture for your recipe :)
          </span>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://images.pexels.com/photos/604969/pexels-photo-604969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="cookingTime"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cooking time
          </label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="45"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};
