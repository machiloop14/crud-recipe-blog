import { RecipeForm } from "../components/RecipeForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import Login from "./Login";
import { useParams } from "react-router-dom";
import { Recipe } from "./AllRecipes";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AppContextProps, AppContext } from "../App";

const EditRecipe = () => {
  const { setIsEditing } = useContext<AppContextProps>(AppContext);
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [recipeUserId, setRecipeUserId] = useState("");
  console.log(id);

  //   useEffect(() => {
  //     return () => {
  //       // Your logic here
  //       setIsEditing(false);
  //       console.log("Component is about to unmount. Performing cleanup...");
  //     };
  //   }, []);
  //   useEffect(() => {
  //     setIsEditing(true);
  //   }, []);

  const fetchRecipeDetails = async () => {
    const docSnap = await getDoc(doc(db, "recipe", id));

    if (docSnap.exists()) {
      const recipeData = docSnap.data() as Recipe;
      setRecipeUserId(recipeData.userId);
    }
  };

  useEffect(() => {
    setIsEditing(true);
    fetchRecipeDetails();
  }, [id]);

  return (
    <div>
      <h1 className="text-4xl">Edit Recipe</h1>
      {user && recipeUserId && user?.uid === recipeUserId ? (
        <RecipeForm />
      ) : (
        <Login warningMessage="Only original author can edit a recipe" />
      )}
    </div>
  );
};

export default EditRecipe;
