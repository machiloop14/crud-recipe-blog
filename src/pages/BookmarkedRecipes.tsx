import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { Recipe as IRecipe } from "../pages/AllRecipes";
import { RecipeItem } from "../components/RecipeItem";
import Login from "./Login";

export const BookmarkedRecipes = () => {
  const [userBookmarks, setUserBookmarks] = useState<string[] | null>(null);
  const [allRecipes, setAllRecipes] = useState<IRecipe[] | null>(null);
  const [user] = useAuthState(auth);

  const fetchUserBookmarks = async () => {
    try {
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

  return (
    <>
      <h1 className="text-4xl mb-10">Bookmarks</h1>
      {user ? (
        <>
          {filteredArray && filteredArray?.length > 0 ? (
            filteredArray?.map((recipe) => (
              <RecipeItem key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p>No Bookmarked Recipe</p>
          )}
        </>
      ) : (
        <Login warningMessage="You must login to view bookmarked Recipes" />
      )}
    </>
  );
};
