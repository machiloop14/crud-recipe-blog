import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Recipe } from "../pages/AllRecipes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { RecipeItem } from "./RecipeItem";
import RingLoader from "react-spinners/RingLoader";
import PropagateLoader from "react-spinners/PropagateLoader";

export const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [recipeDetails, setRecipeDetails] = useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const docRef = doc(db, "recipe", id);

  const fetchRecipeDetails = async () => {
    try {
      setIsLoading(true);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRecipeDetails(docSnap.data() as Recipe[]);
      } else {
        console.error("Document does not exist!");
      }
    } catch (error: any) {
      console.error("Error fetching recipe details:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div className="absolute top-2/4 left-2/4 flex flex-col items-center gap-6 justify-center -translate-x-2/4 -translate-y-2/4">
          <PropagateLoader color="rgb(107, 114, 128)" loading={isLoading} />
          <p className="text-2xl">Loading...</p>
        </div>
      ) : (
        <>
          <h1>Recipe Detail</h1>
          <RecipeItem recipe={recipeDetails} />
        </>
      )}
    </div>
  );
};
