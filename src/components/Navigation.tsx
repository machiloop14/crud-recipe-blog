import {
  MdAddCircleOutline,
  MdBookmarkBorder,
  MdOutlineExplore,
  MdOutlineRestaurantMenu,
  MdOutlineLogout,
  MdMoreVert,
} from "react-icons/md";

const Navigation = () => {
  return (
    <div className="px-6 py-6 w-56 border-r border-[#E8E8E8] fixed left-0  top-0 flex flex-col justify-between h-full">
      <div>
        <div className="logo flex items-center gap-2">
          <div className="bg-[#FF5B27] px-1 py-1 rounded-md">
            <img src="/Vector.png" alt="torque icon" className="w-3 h-3" />
          </div>
          <p className="font-bold text-xl">Curlinara</p>
        </div>
        <button className="flex gap-1.5 items-center justify-center p-2 w-full text-white text-xs add-recipt mt-10 bg-[#FF5B27] rounded-lg">
          <MdAddCircleOutline size={14} className="-mt-0.5" />
          <p>Post Recipe</p>
        </button>
        <div className="menu text-sm mt-6 font-medium text-[#4A4A4A] flex flex-col gap-1.5 ">
          <div className="text-black bg-[#E8E8E8] mb-1.5 rounded-lg flex gap-2  items-center px-2 py-1.5 cursor-pointer ">
            <MdOutlineExplore size={16} />
            <p>Feed</p>
          </div>
          <div className="flex gap-2  items-center px-2 py-1.5 cursor-pointer">
            <MdOutlineRestaurantMenu size={16} />
            <p>My Recipes</p>
          </div>
          <div className="flex gap-2  items-center px-2 py-1.5 cursor-pointer">
            <MdBookmarkBorder size={16} />
            <p>Bookmarks</p>
          </div>
        </div>
      </div>

      {/* profile */}
      <div className="mt-10 border-t border-t-[#E8E8E8] pt-5 flex items-center justify-between">
        {/* left */}
        <div className="flex gap-2 items-center">
          <img src="/User.png" alt="profile image" className="w-8 h-8" />
          <div>
            <p className="font-semibold text-[#4A4A4A] text-sm">Maria Garcia</p>
            <p className="text-[#949494] text-xs">@mariacooks</p>
          </div>
        </div>
        <MdMoreVert size={16} className="cursor-pointer" />
        {/* right */}
      </div>
    </div>
  );
};

export default Navigation;
