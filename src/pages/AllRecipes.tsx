import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { RecipeItem } from "../components/RecipeItem";
import { SortComponent } from "../components/SortComponent";
import { SearchComponent } from "../components/SearchComponent";
import { LuBell } from "react-icons/lu";

export interface Recipe {
  title: string;
  imageUrl: string;
  description: string;
  ingredients: string;
  instruction: string;
  instructions: {
    addedInstruction: string;
  }[];
  author: string;
  userId: string;
  id: string;
  createdAt: number;
}

const AllRecipes = () => {
  const [recipesList, setRecipesList] = useState<Recipe[] | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[] | null>(null);
  const [sortOption, setSortOption] = useState("createdAt");
  const sortOrder = sortOption == "createdAt" ? "desc" : "asc";

  const recipesRef = collection(db, "recipe");
  const orderedQuery = query(recipesRef, orderBy(`${sortOption}`, sortOrder));

  const getRecipes = async () => {
    const data = await getDocs(orderedQuery);
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
  }, [sortOption]);

  const handleSearch = (searchTerm: string) => {
    const filteredResults = recipesList?.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filteredResults as Recipe[]);
  };

  const handleSort = (sortOption: string) => {
    setSortOption(sortOption);
    console.log(sortOption);
  };

  return (
    <div className="wrapper">
      {/* <div className="flex flex-col gap-4 md:flex-row md:gap-0 justify-between max-w-3xl mb-20 items-center md:items-start">
        <SearchComponent onSearch={handleSearch} />
        </div> */}
      <div className="flex justify-between basis-auto border-b border-b-[#E8E8E8] py-4 items-center">
        <div className="w-72">
          <SearchComponent onSearch={handleSearch} />
        </div>
        <div>
          <LuBell size={18} color="#949494" />
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between mb-8">
          <div className="">
            <p className="text-2xl font-bold text-black ">Discover Recipes</p>
            <p className="text-sm text-[#949494] ">
              Explore culinary masterpieces from our community.
            </p>
          </div>
          <div className="w-52 mb-3">
            <SortComponent onSort={handleSort} />
          </div>
        </div>
        <div className="grid grid-cols-3  gap-6 gridss">
          {filteredRecipes?.map((recipe) => (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
