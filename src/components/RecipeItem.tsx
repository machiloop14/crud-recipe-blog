import { Recipe as IRecipe } from "../pages/AllRecipes";
import { DeleteButton } from "../components/DeleteButton";
import { EditButton } from "./EditButton";
import { BookmarkButton } from "./BookmarkButton";
import { Link } from "react-router-dom";
import useConvertTimestamp from "../customHooks/useConvertTimestamp";

interface Props {
  recipe: IRecipe;
}

export const RecipeItem = (props: Props) => {
  const { recipe } = props;
  const createdAtFormatted = useConvertTimestamp(recipe?.createdAt);

  if (!recipe) {
    return <div>No recipe data available.</div>;
  }

  return (
    <div className="recipe-item max-w-3xl py-4 border-b-2 grid border-gray-400 gap-4 ">
      <div className="flex gap-2 flex-col items-end">
        <p>by {recipe.author}</p>
        <p>{createdAtFormatted}</p>
        <div className="flex gap-2">
          <EditButton />
          <BookmarkButton />
          <DeleteButton />
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
        />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
