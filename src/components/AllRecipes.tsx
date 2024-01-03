import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { RecipeItem } from "./RecipeItem";

export interface Recipe {
  title: string;
  imageUrl: string;
  description: string;
  ingredients: string;
  instruction: string;
  author: string;
  userId: string;
  id: string;
  createdAt: number;
}

const AllRecipes = () => {
  const [recipesList, setRecipesList] = useState<Recipe[] | null>(null);

  const recipesRef = collection(db, "recipe");

  const getRecipes = async () => {
    const data = await getDocs(recipesRef);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setRecipesList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Recipe[]
    );
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      {recipesList?.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default AllRecipes;
