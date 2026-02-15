import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Recipe } from "../pages/AllRecipes";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BookmarkButton } from "./BookmarkButton";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import useConvertTimestamp from "../customHooks/useConvertTimestamp";
import { useDefaultImage } from "../customHooks/useDefaultImage";
import { useAuthState } from "react-firebase-hooks/auth";
import { LuShoppingBasket } from "react-icons/lu";
import { MdCircle, MdFormatListNumbered } from "react-icons/md";

export const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [user] = useAuthState(auth);

  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleImageError } = useDefaultImage();

  const docRef = doc(db, "recipe", id);

  const fetchRecipeDetails = async () => {
    try {
      setIsLoading(true);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const recipeData = docSnap.data() as Recipe;
        setRecipeDetails({
          ...recipeData,
          id: docSnap.id, // Include the document ID in the recipe details
        });
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

  console.log(recipeDetails);

  return (
    <div>
      {isLoading ? (
        <div className="absolute top-2/4 left-2/4 flex flex-col items-center gap-6 justify-center -translate-x-2/4 -translate-y-2/4">
          <PropagateLoader color="rgb(107, 114, 128)" loading={isLoading} />
          <p className="text-2xl">Loading...</p>
        </div>
      ) : (
        <div className="recipe-details w-3/4 mx-auto py-14 flex flex-col  gap-6 ">
          <div className="flex flex-col gap-4">
            {/* date and buttons */}
            <div className="flex justify-between items-center">
              <p className="text-xs font-medium text-[#949494]">
                Published on {createdAtFormatted}
              </p>
              <div className="flex gap-1 ">
                {user && user?.uid == recipeDetails?.userId && (
                  <>
                    <div className="bg-white border border-[#E8E8E8] w-7 h-7 rounded-lg flex justify-center items-center">
                      <Link
                        to={`/edit-recipe/${recipeDetails?.id}`}
                        className="max-h-5"
                      >
                        <EditButton />
                      </Link>
                    </div>
                    <div className="bg-white  border border-[#E8E8E8] w-7 h-7 rounded-lg flex justify-center items-center">
                      <DeleteButton recipe={recipeDetails} />
                    </div>
                  </>
                )}

                {user && recipeDetails && (
                  <div className="bg-white  border border-[#E8E8E8] w-7 h-7 rounded-lg flex justify-center items-center">
                    <BookmarkButton recipe={recipeDetails} />
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="font-extrabold text-3xl text-black capitalize">
                {recipeDetails?.title}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <img
                  src={recipeDetails?.userPhotoUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="rounded-full w-8 h-8"
                />
              </div>
              <div>
                <p className="capitalize text-black font-semibold text-sm">
                  {recipeDetails?.author}{" "}
                  {user?.uid == recipeDetails?.userId && "(You)"}
                </p>
                <p className="text-[#949494] text-xs">Recipe Author</p>
              </div>
            </div>
          </div>

          {/* cover image */}
          <div className="py-4 overflow-hidden">
            <img
              src={recipeDetails?.imageUrl}
              alt={recipeDetails?.title}
              className="w-full h-80 object-cover rounded-lg"
              onError={handleImageError}
            />
          </div>

          <div>
            <p className="text-sm">{recipeDetails?.description}</p>
          </div>

          <div className="flex gap-6 mt-4">
            {/* ingredients */}
            <div className="mt-0 bg-[#FBFAF9] px-4 py-4 basis-2/5 rounded-xl ">
              <div className="flex gap-1.5 items-center mb-4">
                <LuShoppingBasket size={18} color="#ff5b27" />
                <p className="text-lg text-black font-bold">Ingredients</p>
              </div>
              <div className="whitespace-pre-line flex flex-col gap-2">
                {recipeDetails?.ingredients.split("\n").map((line) => (
                  <div className="flex gap-3 items-center border-b border-dashed border-[#E8E8E8] py-2 ingredient-li ">
                    <MdCircle size={8} color="#ff5b27" />
                    <p className="capitalize text-black text-sm">{line}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* instructions */}
            <div className="basis-3/5">
              <div className="flex gap-1.5 items-center mb-4">
                <MdFormatListNumbered size={18} color="#ff5b27" />
                <p className="text-lg text-black font-bold">Instructions</p>
              </div>
              <div className="flex gap-4 flex-col">
                <div className=" flex gap-1.5 items-start ">
                  <div className="flex items-center rounded-lg justify-center bg-[#FFDED4] px-2.5 py-1">
                    <p className="font-bold text-[#ff5b27] text-sm ">1</p>
                  </div>
                  <p className="capitalize text-black text-sm ">
                    {recipeDetails?.instruction}
                  </p>
                </div>
                {recipeDetails?.instructions?.map((instruction, index) => (
                  // <p key={index}>
                  //   <span className="font-bold">step {index + 2}: </span>
                  //   <span>{instruction.addedInstruction}</span>
                  // </p>

                  <div className=" flex gap-1.5  items-start" key={index}>
                    <div className="flex items-center rounded-lg justify-center bg-[#FFDED4] px-2.5 py-1">
                      <p className="font-bold text-[#ff5b27] text-sm ">
                        {index + 2}
                      </p>
                    </div>
                    <p className="capitalize text-black text-sm">
                      {instruction.addedInstruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
