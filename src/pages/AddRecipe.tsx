// import { useContext, useEffect } from "react";
import { RecipeForm } from "../components/RecipeForm";
// import { AppContextProps, AppContext } from "../App";

const AddRecipe = () => {
  return (
    <div>
      <h1 className="text-3xl text-black font-bold">Create New Recipe</h1>
      <RecipeForm />
    </div>
  );
};

export default AddRecipe;
