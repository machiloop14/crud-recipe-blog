import * as MdIcons from "react-icons/md";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import Login from "../pages/Login";
import useNotification from "../customHooks/useNotification";
import { useContext, useEffect } from "react";
import { AppContext, AppContextProps } from "../App";
import { Recipe } from "../pages/AllRecipes";

interface RecipeFormData {
  title: string;
  imageUrl: string;
  description: string;
  ingredients: string;
  instruction: string;
  instructions: {
    addedInstruction: string;
  }[];
}

export const RecipeForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { id } = useParams();
  const { isEditing, setIsEditing } = useContext<AppContextProps>(AppContext);
  console.log(id);
  console.log(isEditing);

  const schema = yup.object({
    title: yup.string().required("You must add a title."),
    imageUrl: yup.string().required().default(""),
    description: yup.string().required("You must add a description"),
    ingredients: yup.string().required("You must add a list of ingredients"),
    instruction: yup
      .string()
      .required("Required field. You must add at least one instruction"),
    instructions: yup
      .array()
      .of(
        yup.object({
          addedInstruction: yup
            .string()
            .required("Cannot be blank. Click remove button instead"),
        })
      )
      .required()
      .default([]),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "instructions",
  });

  const recipesRef = collection(db, "recipe");

  const imageUrl = watch("imageUrl");
  const isValidUrl = (url?: string) => {
    try {
      return !!url && Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const fetchRecipeFormValues = async () => {
    if (isEditing && id) {
      const docRef = doc(db, "recipe", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        const {
          title,
          imageUrl,
          ingredients,
          description,
          instruction,
          instructions,
        } = docSnap.data() as Recipe;
        setValue("title", title);
        setValue("imageUrl", imageUrl);
        setValue("description", description);
        setValue("ingredients", ingredients);
        setValue("instruction", instruction);
        setValue("instructions", instructions);
      }
    }
  };

  useEffect(() => {
    fetchRecipeFormValues();
  }, [id, isEditing, setValue]);

  const onSubmit = async (data: RecipeFormData) => {
    console.log(data);
    if (isEditing && id) {
      // Update user details in Firestore
      const docRef = doc(db, "recipe", id);

      updateDoc(docRef, data as any)
        .then(() => {
          console.log(
            "A New Document Field has been added to an existing document"
          );
        })
        .catch((error) => {
          console.log(error);
        });
      setIsEditing(false);
      notify("Recipe updated", { type: "success" });
      navigate("/");
    } else {
      await addDoc(recipesRef, {
        ...data,
        title: data.title.toLowerCase(),
        author: user?.displayName,
        userId: user?.uid,
        userPhotoUrl: user?.photoURL,
        createdAt: serverTimestamp(),
      });

      notify("New recipe added", { type: "success" });
      navigate("/");
    }
  };

  return (
    <>
      {user ? (
        <div className="flex flex-col bg-[#FBFAF9] border border-[#E8E8E8] px-6 rounded-xl mb-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 text-sm mt-4 min-w-full"
          >
            <div className="form__field ">
              <label
                htmlFor="recipeTitle"
                className=" text-black font-medium text-sm"
              >
                Recipe Title
              </label>
              <div>
                <input
                  {...register("title")}
                  id="recipeTitle"
                  className="border rounded-lg bg-[#f8f8f7] outline-none border-[#e8e8e8] pl-3 py-1 h-8 w-full placeholder:text-[#757575] placeholder:not-italic text-sm placeholder:text-sm text-[#757575]"
                  placeholder="e.g Grandma's Apple Pie"
                />
                <p className="text-red-600">{errors.title?.message}</p>
              </div>
            </div>

            <div className="form__field ">
              <label
                htmlFor="recipeDescription"
                className="text-black text-sm font-medium"
              >
                Description
              </label>
              <div>
                <textarea
                  {...register("description")}
                  id="recipeDescription"
                  placeholder="Tell us about your recipe..."
                  className="border rounded-lg bg-[#f8f8f7] outline-none border-[#e8e8e8]  px-3 py-2 h-24 resize-none w-full placeholder:not-italic placeholder:text-[#757575] placeholder:text-sm text-sm text-[#757575]"
                ></textarea>
                <p className="text-red-600">{errors.description?.message}</p>
              </div>
            </div>

            <div className="form__field ">
              <label
                htmlFor="recipeImage"
                className="text-black text-sm font-medium"
              >
                Cover Image
              </label>
              <div>
                <input
                  {...register("imageUrl")}
                  id="recipeImage"
                  className="border rounded-lg bg-[#f8f8f7] outline-none border-[#e8e8e8]  pl-3 py-1 h-8 w-full placeholder:text-[#757575] placeholder:not-italic text-sm placeholder:text-sm text-[#757575]"
                  placeholder="https://"
                />
                <p className="text-red-600">{errors.imageUrl?.message}</p>
              </div>
              {isValidUrl(imageUrl) ? (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt="Recipe preview"
                    className="w-full max-w-sm mx-auto  h-48 object-cover rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=826";
                    }}
                  />
                </div>
              ) : (
                <div>
                  <img src="/imagePreview.png" alt="" />
                </div>
              )}
            </div>

            <div className="form__field ">
              <label
                htmlFor="recipeIngredients"
                className="text-black text-sm font-medium"
              >
                Ingredients
              </label>
              <div>
                <textarea
                  {...register("ingredients")}
                  id="recipeIngredients"
                  placeholder="1 cup flour &#10;sugar"
                  className="border rounded-lg bg-[#f8f8f7] outline-none border-[#e8e8e8]  px-3 py-2 h-24 resize-none w-full placeholder:not-italic placeholder:text-[#757575] placeholder:text-sm text-sm text-[#757575]"
                ></textarea>
                <p className="text-red-600">{errors.ingredients?.message}</p>
              </div>
            </div>

            <div className="form__field ">
              <label
                htmlFor="recipeInstruction"
                className="text-black text-sm font-medium"
              >
                Instructions
              </label>
              <div className="flex gap-1.5">
                <p className="w-5 h-5 bg-[#FFDED4] text-[#FF5B27] rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </p>
                <div className="basis-full">
                  <textarea
                    {...register("instruction")}
                    id="recipeInstruction"
                    className="border rounded-lg bg-[#f8f8f7] outline-none border-[#e8e8e8]  px-3 py-2 h-16 resize-none w-full placeholder:not-italic placeholder:text-[#757575] placeholder:text-sm text-sm text-[#757575]"
                  ></textarea>
                  <p className="text-red-600">{errors.instruction?.message}</p>
                </div>
              </div>
            </div>

            <>
              {fields.map((field, index) => (
                <div className="form__field" key={field.id}>
                  <label
                    htmlFor={`recipeInstruction${index}`}
                    className="text-[#1c120d] font-medium hidden"
                  >
                    {`instruction ${index + 2}`}:
                  </label>
                  <div className="flex w-full gap-1.5">
                    <div className="flex ">
                      <p className="w-5 h-5 bg-[#FFDED4] text-[#FF5B27] rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 2}
                      </p>
                    </div>
                    <div className="basis-full">
                      <textarea
                        {...register(
                          `instructions.${index}.addedInstruction` as const
                        )}
                        id={`recipeInstruction${index}`}
                        className="border rounded-lg bg-[#f8f8f7] outline-none border-[#e8e8e8]  px-3 py-2 h-16 resize-none w-full placeholder:not-italic placeholder:text-[#757575] placeholder:text-sm text-sm text-[#757575]"
                      ></textarea>

                      <p className="text-red-600">
                        {errors.instructions &&
                          errors.instructions[index] &&
                          errors.instructions[index]?.addedInstruction?.message}
                      </p>
                      <button
                        type="button"
                        className="text-[#FF5B27] hover:text-[#9c634a]  text-xs"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>

            <button
              className="flex items-center gap-2"
              type="button"
              onClick={() => {
                console.log("again");
                append({ addedInstruction: "" });
                console.log(fields);
              }} // Pass an empty string or any default value
            >
              <MdIcons.MdAddCircleOutline
                color="#FF5B27"
                size={20}
                className="-mt-0.5"
              />
              <span className="text-[#FF5B27] text-sm">Add Next Step</span>
            </button>

            <div className="border-t border-[#e8e8e8] flex justify-end mb-4">
              <input
                type="submit"
                className="bg-[#FF5B27] text-white py-[6px] px-4 rounded-lg font-medium text-sm mt-4  cursor-pointer hover:bg-black "
                value="Publish Recipe"
                onClick={() => console.log("hello")}
              />
            </div>
          </form>
        </div>
      ) : (
        <Login warningMessage="You must login to add or edit a recipe" />
      )}
    </>
  );
};
