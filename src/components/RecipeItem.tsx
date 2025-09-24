import { Recipe as IRecipe } from "../pages/AllRecipes";
import { DeleteButton } from "../components/DeleteButton";
import { EditButton } from "./EditButton";
import { BookmarkButton } from "./BookmarkButton";
import { Link } from "react-router-dom";
import useConvertTimestamp from "../customHooks/useConvertTimestamp";
import { useDefaultImage } from "../customHooks/useDefaultImage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

interface Props {
  recipe: IRecipe;
}

export const RecipeItem = (props: Props) => {
  const { recipe } = props;
  const createdAtFormatted = useConvertTimestamp(recipe?.createdAt);
  const { handleImageError } = useDefaultImage();
  const [user] = useAuthState(auth);

  if (!recipe) {
    return <div>No recipe data available.</div>;
  }

  return (
    <div className="recipe-item max-w-3xl   grid  gap-0 rounded-xl">
      {/* <div className="flex gap-2 md:flex-col items-end">
        <p>
          {user?.uid == recipe?.userId
            ? "authored by you"
            : `by ${recipe.author}`}
        </p>
        <p>{createdAtFormatted}</p>
        <div className="flex gap-2">
          {user && user?.uid == recipe?.userId && (
            <Link to={`/edit-recipe/${recipe?.id}`} className="max-h-5">
              <EditButton />
            </Link>
          )}
          <BookmarkButton recipe={recipe} />
          <DeleteButton recipe={recipe} />
        </div>
      </div>
      <div>
        <Link to={`recipe/${recipe.id}`} className="text-xl mb-2">
          {recipe.title.toUpperCase()}
        </Link>
        <p className="text-sm">{recipe.description}</p>
      </div>
      <div>
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-40 h-full object-cover"
          onError={handleImageError}
        />
      </div>
      <div></div>
      <div></div> */}
      <div className="image-wrapper">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-40 h-full object-cover rounded-l-xl"
          onError={handleImageError}
        />
      </div>
      <div className="recipe-info py-4 px-4 flex gap-1 flex-col">
        <div className="row-1 flex justify-between items-center ">
          <Link to={`recipe/${recipe.id}`} className="text-xl mb-2">
            {recipe.title.toUpperCase()}
          </Link>
          <BookmarkButton recipe={recipe} />
        </div>
        <div className="flex flex-col gap-8">
          <div className="row-2">
            <p className="text-sm line-clamp-2">{recipe.description}</p>
          </div>
          <div className="row-3 flex gap-1 text-sm">
            <p>
              {user?.uid == recipe?.userId ? "by you" : `by ${recipe.author}`} |
            </p>
            <p> Created: {createdAtFormatted}</p>

            {user && user?.uid == recipe?.userId && (
              <Link to={`/edit-recipe/${recipe?.id}`} className="max-h-5">
                | Edit
              </Link>
            )}
            <DeleteButton recipe={recipe} />
          </div>
        </div>
      </div>
    </div>
  );
};
