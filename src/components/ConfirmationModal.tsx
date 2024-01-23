// ConfirmationModal.js

import { useEffect } from "react";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const ConfirmationModal = ({
  message,
  onConfirm,
  onCancel,
  onClose,
}: ConfirmationModalProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("confirmation-modal");
      if (modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      id="confirmation-modal"
      className="confirmation-modal fixed top-1/2 right-1/2  bg-white p-4 text-gray-500 flex flex-col gap-4"
    >
      <p>{message}</p>
      <div className="flex justify-center gap-1">
        <button onClick={onConfirm} className=" px-2 bg-red-600 text-white">
          Confirm
        </button>
        <button onClick={onCancel} className=" bg-blue-500 px-2 text-white">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
