import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import AllRecipes from "./pages/AllRecipes.tsx";
import AddRecipe from "./pages/AddRecipe.tsx";
import { RecipeDetails } from "./components/RecipeDetails.tsx";
import EditRecipe from "./pages/EditRecipe.tsx";

import { ToastContainer } from "react-toastify";
import { useState, createContext } from "react";
import { BookmarkedRecipes } from "./pages/BookmarkedRecipes.tsx";
import Navigation from "./components/Navigation.tsx";
import { MdMenu } from "react-icons/md";
import { useLocation } from "react-router-dom";

// require("dotenv").config();

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
  const [navigationVisible, setNavigationVisible] = useState(false);
  const location = useLocation();

  return (
    <>
      <AppContext.Provider value={{ isEditing, setIsEditing }}>
        {/* <BrowserRouter> */}
        <div className="bg-white flex flex-1 min-h-screen w-full">
          <Navigation
            navigationVisible={navigationVisible}
            setNavigationVisible={setNavigationVisible}
          />
          <div className="text-gray-500 flex-auto ml-56 max-md:ml-0">
            {/* <Header /> */}
            <MdMenu
              size={20}
              className={`absolute right-6 top-6 md:hidden cursor-pointer ${location.pathname == "/login" && "hidden"}`}
              onClick={() => setNavigationVisible((visible) => !visible)}
            />

            <main className="my-0">
              <Routes>
                <Route path="/" element={<AllRecipes />} />
                <Route
                  path="/login"
                  element={
                    <Login

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
        </div>
        {/* </BrowserRouter> */}
      </AppContext.Provider>
    </>
  );
}

export default App;
