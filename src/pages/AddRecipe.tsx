import { useContext } from "react";
import { RecipeForm } from "../components/RecipeForm";
import { AppContextProps, AppContext } from "../App";

const AddRecipe = () => {
  const { isEditing } = useContext<AppContextProps>(AppContext);

  return (
    <div>
      <h1 className="text-4xl">{isEditing ? "Update Recipe" : "Add Recipe"}</h1>
      <RecipeForm />
    </div>
  );
};

export default AddRecipe;
