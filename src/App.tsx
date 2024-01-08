import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import AllRecipes from "./pages/AllRecipes.tsx";
import AddRecipe from "./pages/AddRecipe.tsx";
import { RecipeDetails } from "./components/RecipeDetails.tsx";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
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
            </Routes>
          </main>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
