import { useState } from "react";

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
    <div>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="search..."
        className="border border-1 border-black-300 px-2 focus-visible:outline-0"
        onChange={handleSearch}
        value={searchTerm}
      />
    </div>
  );
};
