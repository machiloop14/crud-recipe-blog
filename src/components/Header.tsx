import React from "react";
import { SearchComponent } from "./SearchComponent";
import { LuBell, LuLogIn } from "react-icons/lu";
import { Link } from "react-router-dom";

interface Props {
  handleSearch: (params: string) => void;
  placeholder: string;
}

const Header = ({ handleSearch, placeholder }: Props) => {
  return (
    <div className="flex justify-between basis-auto border-b border-b-[#E8E8E8] py-4 items-center px-6">
      <div className="w-72">
        <SearchComponent onSearch={handleSearch} placeholder={placeholder} />
      </div>
      {/* <div>
        <Link
          to="/login"
          className="flex items-center gap-2  text-black hover:text-[#949494] border border-[#e8e8e8] px-2.5 py-1.5 rounded-lg"
        >
          <LuLogIn size={18} />
          <p className="font-medium text-sm">Login</p>
        </Link>
      </div> */}
    </div>
  );
};

export default Header;
