import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import useNotification from "../customHooks/useNotification";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const { notify } = useNotification();

  const signUserOut = async () => {
    await signOut(auth);

    notify("Logout successful", { type: "success" });
  };

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
      <div className="right-nav flex gap-4 items-center ">
        <NavLink to="/" className="hover:text-blue-600 ">
          All Recipes
        </NavLink>
        <NavLink to="/add-recipe" className="hover:text-blue-600">
          Add Recipe
        </NavLink>
        <NavLink to="/bookmarked" className="hover:text-blue-600">
          Bookmarked Recipes
        </NavLink>
        <NavLink to="/deleted" className="hover:text-blue-600">
          Deleted Recipes
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
