import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import useNotification from "../customHooks/useNotification";
import { useState } from "react";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const { notify } = useNotification();
  const [hamburgerMenu, setHamburgerMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const signUserOut = async () => {
    await signOut(auth);

    navigate("/");
    notify("Logout successful", { type: "success" });
  };

  const toggleVisiblity = () => {
    setHamburgerMenu((prev) => !prev);
  };

  console.log(hamburgerMenu);

  return (
    <header className="flex justify-between items-center py-5 border-solid border-b border-black">
      {/* left side of navigation */}
      <div className="left-nav flex gap-7 items-center">
        {user ? (
          <>
            <div className="flex items-center gap-2 hover:text-blue-600">
              <MdIcons.MdLogout />
              <p className="cursor-pointer" onClick={signUserOut}>
                Logout
              </p>
            </div>

            <p className="text-black">Hi, {user?.displayName}</p>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <MdIcons.MdLogin />
            <p>Login</p>
          </Link>
        )}
      </div>

      {/* right side of navigation */}
      <div className="flex items-center">
        <div
          className={`right-nav md:flex flex-col md:flex-row gap-4 items-center fixed md:static right-0 top-0 bg-white bottom-0 pt-16  md:pt-0 w-60 md:w-auto ${
            hamburgerMenu ? "flex" : "hidden"
          }`}
        >
          <NavLink to="/" className="hover:text-blue-600 ">
            All Recipes
          </NavLink>
          <NavLink to="/add-recipe" className="hover:text-blue-600">
            Add Recipe
          </NavLink>
          <NavLink to="/bookmarked" className="hover:text-blue-600">
            Bookmarked Recipes
          </NavLink>
        </div>
        <button onClick={toggleVisiblity}>
          {hamburgerMenu ? (
            <MdIcons.MdClose
              className={`md:hidden z-50 w-8 h-8 top-4 right-0 mr-4 ${
                hamburgerMenu ? "fixed" : "absolute"
              }`}
            />
          ) : (
            <MdIcons.MdMenu
              className={`md:hidden z-50 w-8 h-8 top-4 right-0 mr-4 ${
                hamburgerMenu ? "fixed" : "absolute"
              }`}
            />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
