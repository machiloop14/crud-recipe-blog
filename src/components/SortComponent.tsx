export const SortComponent = () => {
  return (
    <div className=" flex gap-2">
      <p className="font-bold">Sort by:</p>
      <select className="title focus-visible:outline-0">
        <option value="date" className="italic">
          Recently added
        </option>
        <option value="alphabetically" className="italic">
          Alphabetically(title)
        </option>
      </select>
    </div>
  );
};
