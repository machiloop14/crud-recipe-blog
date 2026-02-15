import { useAuthState } from "react-firebase-hooks/auth";
import {
  MdAddCircleOutline,
  MdBookmarkBorder,
  MdOutlineExplore,
  MdOutlineRestaurantMenu,
  MdMoreVert,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import useNotification from "../customHooks/useNotification";
import { signOut } from "firebase/auth";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  console.log("location: " + location.pathname);

  const { notify } = useNotification();

  const signUserOut = async () => {
    await signOut(auth);

    navigate("/");
    notify("Logout successful", { type: "success" });
  };

  return (
    <div className="px-6 py-6 w-56 border-r border-[#E8E8E8] fixed left-0  top-0 flex flex-col justify-between h-full">
      <div>
        <div className="logo flex items-center gap-2">
          <div className="bg-[#FF5B27] px-1 py-1 rounded-md">
            <img src="/Vector.png" alt="torque icon" className="w-3 h-3" />
          </div>
          <p className="font-bold text-xl">Curlinara</p>
        </div>
        <Link
          to="/add-recipe"
          className="flex gap-1.5 items-center justify-center p-2 w-full text-white text-xs add-recipt mt-10 bg-[#FF5B27] rounded-lg"
        >
          <MdAddCircleOutline size={14} className="-mt-0.5" />
          <p>Post Recipe</p>
        </Link>
        <div className="menu text-sm mt-6 font-medium text-[#4A4A4A] flex flex-col gap-1.5 ">
          <Link
            to="/"
            className={`${location.pathname == "/" && "text-black bg-[#E8E8E8]  rounded-lg"} flex gap-2  items-center px-2 py-1.5 cursor-pointer`}
          >
            <MdOutlineExplore size={16} />
            <p>Feed</p>
          </Link>
          <div className="flex gap-2  items-center px-2 py-1.5 cursor-not-allowed">
            <MdOutlineRestaurantMenu size={16} />
            <p>My Recipes</p>
          </div>
          <Link
            to="/bookmarked"
            className={`${location.pathname == "/bookmarked" && "text-black bg-[#E8E8E8]  rounded-lg"} flex gap-2  items-center px-2 py-1.5 cursor-pointer`}
          >
            <MdBookmarkBorder size={16} />
            <p>Bookmarks</p>
          </Link>
        </div>
      </div>

      {/* profile */}
      {user ? (
        <div className="mt-10 border-t border-t-[#E8E8E8] pt-5 flex items-center justify-between">
          {/* left */}
          <div className="flex gap-2 items-center">
            <img
              src={user.photoURL || "/avatar.jpg"}
              alt="profile image"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-semibold text-[#4A4A4A] text-sm capitalize">
                {user.displayName}
              </p>
              <p className="text-[#949494] text-xs">
                @{user.email?.split("@")[0]}
              </p>
            </div>
          </div>

          <LuLogOut
            size={16}
            className="cursor-pointer hover:text-[#949494]"
            onClick={signUserOut}
          />
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2  text-black hover:text-[#949494] border border-[#e8e8e8] px-2.5 py-1.5 rounded-lg "
          >
            <LuLogIn size={18} />
            <p className="font-medium text-sm">Login</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;
