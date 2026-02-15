// import * as FaIcons from "react-icons/fa";
import { useContext } from "react";
import { AppContext, AppContextProps } from "../App";
import { LuPencil } from "react-icons/lu";

export const EditButton = () => {
  const { setIsEditing } = useContext<AppContextProps>(AppContext);

  return (
    <button onClick={() => setIsEditing(true)}>
      <LuPencil className="w-3.5 h-3.5 cursor-pointer " color="black" />
    </button>
  );
};
