import { Recipe as IRecipe } from "../pages/AllRecipes";
import { DeleteButton } from "../components/DeleteButton";
import { EditButton } from "./EditButton";
import { BookmarkButton } from "./BookmarkButton";

interface Props {
  recipe: IRecipe;
}

export const RecipeItem = (props: Props) => {
  const { recipe } = props;

  const day = recipe.createdAt.toDate().getDate().toString().padStart(2, "0");
  const month = (recipe.createdAt.toDate().getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const year = recipe.createdAt.toDate().getFullYear();
  const createdAtFormatted = `${day}/${month}/${year}`;

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
        <h1 className="text-xl mb-2">{recipe.title.toUpperCase()}</h1>
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
