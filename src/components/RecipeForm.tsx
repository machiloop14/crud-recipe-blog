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

  // const schema = yup.object().shape({
  //   title: yup.string().required("You must add a title."),
  //   imageUrl: yup.string(),
  //   description: yup.string().required("You must add a description"),
  //   ingredients: yup.string().required("You must add a list of ingredients"),
  //   instruction: yup
  //     .string()
  //     .required("Required field. You must add at least one instruction"),
  //   instructions: yup.array().of(
  //     yup.object({
  //       addedInstruction: yup
  //         .string()
  //         .required("Cannot be blank. Click remove button instead"),
  //     })
  //   ),
  // });
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
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "instructions",
  });

  const recipesRef = collection(db, "recipe");

  // const onSubmit = async (data: RecipeFormData) => {
  //   await addDoc(recipesRef, {
  //     title: data.title.toLowerCase(),
  //     imageUrl: data.imageUrl,
  //     description: data.description,
  //     ingredients: data.ingredients,
  //     instruction: data.instruction,
  //     author: user?.displayName,
  //     id: user?.uid,
  //   });

  //   navigate("/");
  // };

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
        <div className="flex flex-col">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-sm mt-8"
          >
            <div className="form__field ">
              <label
                htmlFor="recipeTitle"
                className="w-36 text-[#1c120d] font-medium"
              >
                Recipe Title:
              </label>
              <div>
                <input
                  {...register("title")}
                  id="recipeTitle"
                  className="border rounded-lg bg-transparent outline-0 border-[#e8d6cf] focus:border-2 pl-3 py-1 h-10 w-full placeholder:text-[#9c634a] placeholder:not-italic"
                  placeholder="Enter recipe title"
                />
                <p className="text-red-600">{errors.title?.message}</p>
              </div>
            </div>

            <div className="form__field ">
              <label
                htmlFor="recipeDescription"
                className="text-[#1c120d] font-medium"
              >
                Description:{" "}
              </label>
              <div>
                <textarea
                  {...register("description")}
                  id="recipeDescription"
                  className="border rounded-lg bg-transparent outline-0 border-[#e8d6cf] focus:border-2 px-1 py-1 h-28 resize-none w-full"
                ></textarea>
                <p className="text-red-600">{errors.description?.message}</p>
              </div>
            </div>

            <div className="form__field ">
              <label
                htmlFor="recipeImage"
                className="w-36 text-[#1c120d] font-medium"
              >
                Recipe Image(url):
              </label>
              <div>
                <input
                  {...register("imageUrl")}
                  id="recipeImage"
                  className="border rounded-lg bg-transparent outline-0 border-[#e8d6cf] focus:border-2 pl-3 py-1 h-10 w-full placeholder:text-[#9c634a] placeholder:not-italic"
                  placeholder="Enter image url"
                />
                <p className="text-red-600">{errors.imageUrl?.message}</p>
              </div>
            </div>

            <div className="form__field ">
              <label
                htmlFor="recipeIngredients"
                className="text-[#1c120d] font-medium"
              >
                Ingredients:{" "}
              </label>
              <div>
                <textarea
                  {...register("ingredients")}
                  id="recipeIngredients"
                  className="border rounded-lg bg-transparent outline-0 border-[#e8d6cf] focus:border-2 px-1 py-1 h-28 resize-none w-full"
                ></textarea>
                <p className="text-red-600">{errors.ingredients?.message}</p>
              </div>
            </div>

            <div className="form__field ">
              <label
                htmlFor="recipeInstruction"
                className="text-[#1c120d] font-medium"
              >
                Instruction 1:{" "}
              </label>
              <div>
                <textarea
                  {...register("instruction")}
                  id="recipeInstruction"
                  className="border rounded-lg bg-transparent outline-0 border-[#e8d6cf] focus:border-2 px-1 py-1 h-14 resize-none w-full"
                ></textarea>
                <p className="text-red-600">{errors.instruction?.message}</p>
              </div>
            </div>

            <>
              {fields.map((field, index) => (
                <div className="form__field" key={field.id}>
                  <label
                    htmlFor={`recipeInstruction${index}`}
                    className="text-[#1c120d] font-medium"
                  >
                    {`instruction ${index + 2}`}:
                  </label>
                  <div>
                    <textarea
                      {...register(
                        `instructions.${index}.addedInstruction` as const
                      )}
                      id={`recipeInstruction${index}`}
                      className="border rounded-lg bg-transparent outline-0 border-[#e8d6cf] focus:border-2 px-1 py-1 h-14 resize-none w-full"
                    ></textarea>
                    <p className="text-red-600">
                      {errors.instructions &&
                        errors.instructions[index] &&
                        errors.instructions[index]?.addedInstruction?.message}
                    </p>
                    <button
                      type="button"
                      className="text-[#9c634a] hover:border-[#9c634a] hover:border-b-2"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </>

            <button
              className="flex items-center gap-1"
              type="button"
              onClick={() => {
                console.log("again");
                append({ addedInstruction: "" });
                console.log(fields);
              }} // Pass an empty string or any default value
            >
              <MdIcons.MdAddCircle
                style={{ color: "#f0570d", width: "30px", height: "30px" }}
              />
              <span>Add Instruction</span>
            </button>

            <input
              type="submit"
              className="bg-[#f0570d] text-white py-[6px] px-4 rounded-md font-medium mt-3 cursor-pointer hover:bg-black self-end"
              value="Create Recipe"
              onClick={() => console.log("hello")}
            />
          </form>
        </div>
      ) : (
        <Login warningMessage="You must login to add or edit a recipe" />
      )}
    </>
  );
};
