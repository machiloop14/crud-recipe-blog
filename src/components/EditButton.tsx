import * as FaIcons from "react-icons/fa";
import { useContext } from "react";
import { AppContext, AppContextProps } from "../App";

export const EditButton = () => {
  const { setIsEditing } = useContext<AppContextProps>(AppContext);

  return (
    <button onClick={() => setIsEditing(true)}>
      <FaIcons.FaPenSquare className="w-5 h-5 cursor-pointer" />;
    </button>
  );
};
