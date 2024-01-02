import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.tsx";
import AllRecipes from "./components/AllRecipes.tsx";
import AddRecipe from "./components/AddRecipe.tsx";

function App() {
  const [count, setCount] = useState(0);

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
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
