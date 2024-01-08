import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Recipe } from "../pages/AllRecipes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BookmarkButton } from "./BookmarkButton";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import useConvertTimestamp from "../customHooks/useConvertTimestamp";

export const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const docRef = doc(db, "recipe", id);

  const fetchRecipeDetails = async () => {
    try {
      setIsLoading(true);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRecipeDetails(docSnap.data() as Recipe);
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

  //convert the timestamp to a date format
  // const day = recipeDetails?.createdAt
  //   .toDate()
  //   .getDate()
  //   .toString()
  //   .padStart(2, "0");
  // const month = (recipeDetails?.createdAt.toDate().getMonth() + 1)
  //   .toString()
  //   .padStart(2, "0");
  // const year = recipeDetails?.createdAt.toDate().getFullYear();
  // const createdAtFormatted = `${day}/${month}/${year}`;

  const createdAtFormatted = useConvertTimestamp(recipeDetails?.createdAt);

  return (
    <div>
      {isLoading ? (
        <div className="absolute top-2/4 left-2/4 flex flex-col items-center gap-6 justify-center -translate-x-2/4 -translate-y-2/4">
          <PropagateLoader color="rgb(107, 114, 128)" loading={isLoading} />
          <p className="text-2xl">Loading...</p>
        </div>
      ) : (
        <div className="recipe-details max-w-3xl py-4 flex flex-col  gap-4 ">
          <div className="border-b-2 border-gray-400 py-4">
            <img
              src={recipeDetails?.imageUrl}
              alt={recipeDetails?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-6 items-end ">
              <p>by {recipeDetails?.author}</p>
              <p>{createdAtFormatted}</p>
              <div className="flex gap-2">
                <EditButton />
                <BookmarkButton />
                <DeleteButton />
              </div>
            </div>
            <div className="mt-8">
              <Link to={`recipe/${recipeDetails?.id}`} className="text-xl mb-2">
                {recipeDetails?.title.toUpperCase()}
              </Link>
              <p className="text-sm">{recipeDetails?.description}</p>
            </div>
            <div className="mt-12">
              <h1 className="text-xl mb-2 italic">Ingredients</h1>
              <p className="whitespace-pre-line">
                {recipeDetails?.ingredients}
              </p>
            </div>
            <div className="mt-12">
              <h1 className="text-xl mb-2 italic">Instructions</h1>
              <p className="whitespace-pre-line">
                {recipeDetails?.instruction}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
