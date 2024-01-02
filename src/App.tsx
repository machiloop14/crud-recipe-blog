import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.tsx";
import AllRecipes from "./components/AllRecipes.tsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <div className="w-11/12 mx-auto py-5 text-gray-500">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<AllRecipes />} />
              <Route
                path="/login"
                element={
                  <Login
                    heading="Login"
                    warningMessage="You have to login first"
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
