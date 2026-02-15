import { useState } from "react";
import { LuSearch } from "react-icons/lu";

interface Props {
  onSearch: (params: string) => void;
  placeholder: string;
}

export const SearchComponent = ({ onSearch, placeholder }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: { target: { value: string } }) => {
    const term = event.target.value;
    console.log(term);
    setSearchTerm(term);
    onSearch(term); // Call the parent component's search function with the term
  };

  return (
    <div className="w-full px-3 bg-[#f8f8f7] rounded-lg py-2 flex flex-row gap-2 items-center border border-[#E8E8E8]">
      <LuSearch size={18} color="#949494" />
      <input
        type="search"
        name="search"
        id="search"
        placeholder={placeholder}
        className="placeholder:not-italic placeholder:text-[#757575] text-[#757575] focus-visible:outline-0 w-full bg-transparent text-sm focus:outline-none focus:bg-transparent "
        onChange={handleSearch}
        value={searchTerm}
      />
    </div>
  );
};
