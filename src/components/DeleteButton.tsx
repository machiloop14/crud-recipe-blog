import * as MdIcons from "react-icons/md";
import { Recipe as IRecipe } from "../pages/AllRecipes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import useNotification from "../customHooks/useNotification";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

interface Props {
  recipe: IRecipe;
}

export const DeleteButton = ({ recipe }: Props) => {
  const [user] = useAuthState(auth);
  const { notify } = useNotification();
  const navigate = useNavigate();
  const docRef = doc(db, "recipe", recipe.id);

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleDeleteClick = () => {
    // Show the confirmation modal when delete button is clicked
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // Perform the deletion logic here
    // ...
    const deleteRecipe = async () => {
      try {
        const docSnap = await deleteDoc(docRef);

        notify("Deleted successfuly", { type: "success" });
        navigate("/");
      } catch (error: any) {
        console.error("Error deleting document:", error.message);
      }
    };

    deleteRecipe();

    // Hide the confirmation modal after deletion
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    // Hide the confirmation modal without performing deletion
    setShowConfirmation(false);
  };

  const handleClose = () => {
    // Close the confirmation modal
    setShowConfirmation(false);
  };

  return (
    <>
      {user && user?.uid == recipe.userId && (
        <button onClick={handleDeleteClick}>
          <MdIcons.MdDelete className="w-5 h-5 cursor-pointer" />
        </button>
      )}
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleClose}
        />
      )}
    </>
  );
};
