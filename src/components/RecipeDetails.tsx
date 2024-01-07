import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Recipe } from "../pages/AllRecipes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { RecipeItem } from "./RecipeItem";
import RingLoader from "react-spinners/RingLoader";
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
        <div className="recipe-item max-w-3xl py-4 border-b-2 grid border-gray-400 gap-4 ">
          <div className="flex gap-2 flex-col items-end">
            <p>by {recipeDetails?.author}</p>
            <p>{createdAtFormatted}</p>
            <div className="flex gap-2">
              <EditButton />
              <BookmarkButton />
              <DeleteButton />
            </div>
          </div>
          <div>
            <Link to={`recipe/${recipeDetails?.id}`} className="text-xl mb-2">
              {recipeDetails?.title.toUpperCase()}
            </Link>
            <p className="text-sm">{recipeDetails?.description}</p>
          </div>
          <div>
            <img
              src={recipeDetails?.imageUrl}
              alt={recipeDetails?.title}
              className="w-40 h-full object-cover"
            />
          </div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};
