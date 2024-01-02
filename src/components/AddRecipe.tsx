import * as MdIcons from "react-icons/md";

const AddRecipe = () => {
  return (
    <div>
      <h1 className="text-4xl">Add Recipe</h1>
      <form className="flex flex-col gap-4 text-sm mt-8">
        <div className="form__field grid ">
          <label htmlFor="recipeTitle" className="w-36">
            Recipe Title:
          </label>
          <input
            type="text"
            id="recipeTitle"
            className="border outline-0 border-gray-500 focus:border-blue-600 px-1 py-1 h-10"
          />
        </div>
        <div className="form__field grid ">
          <label htmlFor="recipeImage" className="w-36">
            Recipe Image url:
          </label>
          <input
            type="url"
            id="recipeImage"
            className="border outline-0 border-gray-500 focus:border-blue-600 px-1 py-1 h-10"
          />
        </div>
        <div className="form__field grid ">
          <label htmlFor="recipeDescription">Recipe Description: </label>
          <textarea
            name="recipeDescription"
            id="recipeDescription"
            className="border outline-0 border-gray-500 focus:border-blue-600 px-1 py-1 h-28 resize-none"
          ></textarea>
        </div>
        <div className="form__field grid ">
          <label htmlFor="recipeIngredients">Recipe Ingredients: </label>
          <textarea
            name="recipeIngredients"
            id="recipeIngredients"
            className="border outline-0 border-gray-500 focus:border-blue-600 px-1 py-1 h-28 resize-none"
          ></textarea>
        </div>
        <div className="form__field grid ">
          <label htmlFor="recipeInstruction">Instruction 1: </label>
          <textarea
            name="recipeInstruction"
            id="recipeInstruction"
            className="border outline-0 border-gray-500 focus:border-blue-600 px-1 py-1 h-14 resize-none"
          ></textarea>
        </div>
        <button className="flex items-center gap-1">
          <MdIcons.MdAddCircle
            style={{ color: "black", width: "30px", height: "30px" }}
          />
          <span>Add Instruction</span>
        </button>
        <input
          type="submit"
          className="bg-gray-500 text-white p-2 mt-3 cursor-pointer hover:bg-black"
          value="submit"
        />
      </form>
    </div>
  );
};

export default AddRecipe;
