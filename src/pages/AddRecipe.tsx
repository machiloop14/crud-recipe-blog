// import { useContext, useEffect } from "react";
import { RecipeForm } from "../components/RecipeForm";
// import { AppContextProps, AppContext } from "../App";

const AddRecipe = () => {
  return (
    <div className="mx-auto w-3/4 pt-8 flex-1 flex flex-col">
      <div className="flex flex-col gap-2 mb-4">
        <p className="text-2xl font-bold text-black ">Create New Recipe</p>
        <p className="text-sm text-[#949494] ">
          Share your culinary masterpiece with the world.
        </p>
      </div>
      <div>
        <RecipeForm />
      </div>
    </div>
  );
};

export default AddRecipe;
