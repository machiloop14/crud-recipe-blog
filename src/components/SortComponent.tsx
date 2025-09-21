import { useState } from "react";

interface Props {
  onSort: (params: string) => void;
}

export const SortComponent = ({ onSort }: Props) => {
  const [value, setValue] = useState("createdAt");

  const handleSort = (event: { target: { value: string } }) => {
    const sortOption = event.target.value;
    setValue(sortOption);
    onSort(sortOption);
  };

  return (
    <div className=" flex gap-2 bg-[#f5ebe8] rounded-full px-4 py-2 text-sm font-medium text-black">
      <p className="">Sort by:</p>
      <select
        className="italic focus-visible:outline-0 bg-transparent "
        value={value}
        onChange={handleSort}
      >
        <option value="createdAt" className="bg-[#f5ebe8]">
          Recently added
        </option>
        <option value="title" className="bg-[#f5ebe8]">
          Alphabetically(title)
        </option>
      </select>
    </div>
  );
};
