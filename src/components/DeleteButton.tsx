import { Recipe as IRecipe } from "../pages/AllRecipes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import useNotification from "../customHooks/useNotification";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { LuTrash2 } from "react-icons/lu";

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
        await deleteDoc(docRef);

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
        <LuTrash2
          onClick={handleDeleteClick}
          className="w-3.5 h-3.5 cursor-pointer"
          color="#FF0000"
        />
      )}
      {showConfirmation && (
        <ConfirmationModal
          heading="Delete Recipe"
          message="You're going to delete this recipe permanently. Are you sure?"
          confirmationText="Yes, Delete!"
          cancelText="No, Keep it."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleClose}
        />
      )}
    </>
  );
};
