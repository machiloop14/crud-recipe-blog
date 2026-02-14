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

  console.log(user);

  return (
    <div className="recipe-item max-w-3xl  flex flex-col  gap-0 rounded-xl overflow-hidden ">
      <div className="image-wrapper overflow-hidden relative">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-40 object-cover "
          onError={handleImageError}
        />
        <div className="flex gap-1 absolute  top-4 right-2">
          {user && user?.uid == recipe?.userId && (
            <>
              <div className="bg-white w-6 h-6 rounded-full flex justify-center items-center">
                <Link to={`/edit-recipe/${recipe?.id}`} className="max-h-5">
                  <EditButton />
                </Link>
              </div>
              <div className="bg-white w-6 h-6 rounded-full flex justify-center items-center">
                <DeleteButton recipe={recipe} />
              </div>
            </>
          )}

          {user && (
            <div className="bg-white w-6 h-6 rounded-full flex justify-center items-center">
              <BookmarkButton recipe={recipe} />
            </div>
          )}
        </div>
      </div>
      {/* bottom */}
      <div className="recipe-info px-4  flex flex-col justify-between flex-1 bg-[#FBFAF9]">
        {/* bottom top */}
        <div className="py-4 flex flex-col  ">
          {/* <div className="row-1 flex justify-between items-center  gap-2"> */}
          <Link
            to={`recipe/${recipe.id}`}
            className="text-lg font-semibold mb-2 text-black capitalize "
          >
            {recipe.title}
          </Link>
          {/* <BookmarkButton recipe={recipe} /> */}
          {/* </div> */}
          <div>
            <p className="line-clamp-3 text-[#949494] text-sm">
              {recipe.description}
            </p>
          </div>
        </div>
        {/* bottom bottom */}
        <div className="border-t border-[#E8E8E8] flex justify-between py-4 items-center">
          <div className="flex gap-2 items-center">
            <img
              src={recipe.userPhotoUrl}
              alt=""
              className="w-6 h-6 object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
            <p className="text-xs font-medium text-black capitalize">
              {user?.uid == recipe?.userId ? "You" : recipe.author}
            </p>
          </div>

          <p className="text-xs text-[#949494]">{createdAtFormatted}</p>
        </div>
        {/* <div className="flex flex-col gap-8">
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
        </div> */}
      </div>
    </div>
  );
};
