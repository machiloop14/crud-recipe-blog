import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import AllRecipes from "./pages/AllRecipes.tsx";
import AddRecipe from "./pages/AddRecipe.tsx";
import { RecipeDetails } from "./components/RecipeDetails.tsx";
import EditRecipe from "./pages/EditRecipe.tsx";

import { ToastContainer } from "react-toastify";
import { useState, createContext } from "react";
import { BookmarkedRecipes } from "./pages/BookmarkedRecipes.tsx";

require("dotenv").config();

export interface AppContextProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AppContext = createContext<AppContextProps>({
  isEditing: false,
  setIsEditing: () => {},
});

function App() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <AppContext.Provider value={{ isEditing, setIsEditing }}>
        <BrowserRouter>
          <div className="w-11/12 mx-auto text-gray-500">
            <Navbar />
            <main className="my-8">
              <Routes>
                <Route path="/" element={<AllRecipes />} />
                <Route
                  path="/login"
                  element={
                    <Login
                      heading="Login"
                      // warningMessage="You have to login first"
                    />
                  }
                />
                <Route path="/add-recipe" element={<AddRecipe />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/edit-recipe/:id" element={<EditRecipe />} />
                <Route path="/bookmarked" element={<BookmarkedRecipes />} />
              </Routes>
            </main>
            <ToastContainer />
          </div>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
