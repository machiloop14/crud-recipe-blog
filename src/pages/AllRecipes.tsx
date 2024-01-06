import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { RecipeItem } from "../components/RecipeItem";
import { SortComponent } from "../components/SortComponent";
import { SearchComponent } from "../components/SearchComponent";

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
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[] | null>(null);

  const recipesRef = collection(db, "recipe");

  const getRecipes = async () => {
    const data = await getDocs(recipesRef);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setRecipesList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Recipe[]
    );
    setFilteredRecipes(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Recipe[]
    );
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filteredResults = recipesList?.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filteredResults as Recipe[]);
  };

  return (
    <div className="wrapper">
      <div className="flex justify-between max-w-3xl mb-20">
        <SortComponent />
        <SearchComponent onSearch={handleSearch} />
      </div>
      <div className="flex flex-col gap-6">
        {filteredRecipes?.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
