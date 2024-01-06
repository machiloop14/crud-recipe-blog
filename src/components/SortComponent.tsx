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
    <div className=" flex gap-2">
      <p className="font-bold">Sort by:</p>
      <select
        className="italic focus-visible:outline-0"
        value={value}
        onChange={handleSort}
      >
        <option value="createdAt">Recently added</option>
        <option value="title">Alphabetically(title)</option>
      </select>
    </div>
  );
};
