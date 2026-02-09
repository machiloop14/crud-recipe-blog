import React from "react";
import { SearchComponent } from "./SearchComponent";
import { LuBell } from "react-icons/lu";

const Header = () => {
  return (
    <div className="flex justify-between basis-auto border-b border-b-[#E8E8E8] px-6 py-4 items-center">
      <div className="w-72">
        <SearchComponent onSearch={(term) => console.log(term)} />
      </div>
      <div>
        <LuBell size={18} color="#949494" />
      </div>
    </div>
  );
};

export default Header;
