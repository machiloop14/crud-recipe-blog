import { Recipe as IRecipe } from "./AllRecipes";
import { serverTimestamp } from "firebase/firestore";

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
    <div>
      <h1>{recipe.author}</h1>
      <p>{recipe.title}</p>
      <p>{recipe.description}</p>
      <img src={recipe.imageUrl} alt={recipe.title} />
      <p>{recipe.ingredients}</p>
      <p>{recipe.instruction}</p>
      <p>{createdAtFormatted}</p>
    </div>
  );
};
