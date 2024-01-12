// import { useContext, useEffect } from "react";
import { RecipeForm } from "../components/RecipeForm";
// import { AppContextProps, AppContext } from "../App";

const AddRecipe = () => {
  return (
    <div>
      <h1 className="text-4xl">Add Recipe</h1>
      <RecipeForm />
    </div>
  );
};

export default AddRecipe;
