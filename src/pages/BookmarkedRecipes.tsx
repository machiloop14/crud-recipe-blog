import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { Recipe as IRecipe } from "../pages/AllRecipes";
import { RecipeItem } from "../components/RecipeItem";
import Header from "../components/Header";
import LoginPrompt from "../components/LoginPrompt";
import { PacmanLoader } from "react-spinners";

export const BookmarkedRecipes = () => {
  const [userBookmarks, setUserBookmarks] = useState<string[] | null>(null);
  const [allRecipes, setAllRecipes] = useState<IRecipe[] | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user] = useAuthState(auth);

  const fetchUserBookmarks = async () => {
    try {
      setIsLoading(true);
      if (user && user.uid) {
        // Check if user and user.uid are not undefined
        const userQuery = query(
          collection(db, "bookmarks"),
          where("userId", "==", user.uid), // Use user.uid directly
          orderBy("bookmarkedAt", "desc")
        );

        const data = await getDocs(userQuery);

        data.docs.map((doc) => console.log(doc.data()));

        setUserBookmarks(data.docs.map((doc) => doc.data().postId));
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
      console.log(userBookmarks);
    }
  };

  useEffect(() => {
    fetchUserBookmarks();
  }, [user]); // Add user as a dependency to useEffect

  console.log(userBookmarks);

  const fetchAllPosts = async () => {
    try {
      if (user && user?.uid) {
        // Check if user and user.uid are not undefined
        const allPosts = query(collection(db, "recipe"));

        const data = await getDocs(allPosts);

        console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        // data.docs.map((doc) => console.log(doc.data()));

        setAllRecipes(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IRecipe[]
        );
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      console.log(allRecipes);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, [userBookmarks]);

  console.log(allRecipes);

  const filteredArray = allRecipes
    ?.filter((recipe) => userBookmarks?.includes(recipe.id))
    .sort((a, b) => {
      // Custom sorting function to maintain the order of filterValues
      const indexA = userBookmarks?.indexOf(a.id);
      const indexB = userBookmarks?.indexOf(b.id);

      return indexA !== undefined && indexB !== undefined ? indexA - indexB : 0;
    });

  console.log(filteredArray);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredRecipes(null); // reset to all bookmarks
      return;
    }

    const filteredResults = filteredArray?.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredRecipes(filteredResults as IRecipe[]);
  };

  const recipesToShow = filteredRecipes ?? filteredArray;

  return (
    <div>
      <Header
        handleSearch={handleSearch}
        placeholder="search your bookmarks..."
      />

      <div className="mt-6 mb-8 flex flex-col gap-2 px-6">
        <p className="text-2xl font-bold text-black ">Saved Recipes</p>
        <p className="text-sm text-[#949494] ">
          {filteredArray?.length} Recipes saved to your collection.
        </p>
      </div>
      {user ? (
        <>
          {isLoading ? (
            <div className="absolute top-2/3 left-2/4 flex flex-col items-center gap-6 justify-center -translate-x-2/4 -translate-y-2/4">
              {/* <GridLoader color="rgb(107, 114, 128)" loading={isLoading} /> */}
              <PacmanLoader color="#ff5b27" loading={isLoading} />
              <p className="text-2xl">Loading...</p>
            </div>
          ) : recipesToShow && recipesToShow?.length > 0 ? (
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 gridss mb-6 px-6">
              {recipesToShow?.map((recipe) => (
                <RecipeItem key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <p className="text-[#1c120d] px-6">No Bookmarked Recipe</p>
          )}
        </>
      ) : (
        <LoginPrompt message="You have to sign in to view your bookmarks" />
      )}
    </div>
  );
};
