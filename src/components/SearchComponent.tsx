import { useState } from "react";
import searchImage from "../assets/images/search.png";

interface Props {
  onSearch: (params: string) => void;
}

export const SearchComponent = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: { target: { value: string } }) => {
    const term = event.target.value;
    console.log(term);
    setSearchTerm(term);
    onSearch(term); // Call the parent component's search function with the term
  };

  return (
    <div className="w-full px-4 bg-[#f5ebe8] rounded-lg py-2 flex flex-row gap-2 items-center">
      <img src={searchImage} alt="" className="w-4 h-4 mt-1" />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search recipes"
        className="border-black-300 placeholder:not-italic placeholder:text-[#9c634a] text-[#9c634a] focus-visible:outline-0 w-full bg-transparent"
        onChange={handleSearch}
        value={searchTerm}
      />
    </div>
  );
};
