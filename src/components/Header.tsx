import React from "react";
import { SearchComponent } from "./SearchComponent";
import { LuBell } from "react-icons/lu";

interface Props {
  handleSearch: (params: string) => void;
  placeholder: string;
}

const Header = ({ handleSearch, placeholder }: Props) => {
  return (
    <div className="flex justify-between basis-auto border-b border-b-[#E8E8E8] py-4 items-center">
      <div className="w-72">
        <SearchComponent onSearch={handleSearch} placeholder={placeholder} />
      </div>
      <div>
        <LuBell size={18} color="#949494" />
      </div>
    </div>
  );
};

export default Header;
