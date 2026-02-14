// ConfirmationModal.js

import { useEffect } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";

interface ConfirmationModalProps {
  heading?: string;
  message: string;
  confirmationText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const ConfirmationModal = ({
  message,
  heading,
  confirmationText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
}: ConfirmationModalProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("modal-main");
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
      className="confirmation-modal  fixed w-screen h-screen bg-black/50 right-0 bottom-0  z-[1000] flex items-center justify-center   text-gray-500 "
    >
      <div
        id="modal-main"
        className=" flex flex-col rounded-xl bg-white p-4 gap-2 items-center max-w-[264px]"
      >
        <div className="bg-[#fff5f6] px-3 py-3 rounded-full">
          <BsExclamationTriangleFill size={20} color="#ff3f56" />
        </div>

        {heading && (
          <p className="font-semibold text-black text-lg">{heading}</p>
        )}

        <p className="text-sm text-center text-[#49555e] ">{message}</p>

        <div className="flex  w-full flex-row-reverse justify-center gap-1 mt-1">
          <button
            onClick={onConfirm}
            className=" basis-1/2 py-2 rounded-full text-xs font-semibold bg-[#ff3f56] text-white"
          >
            {confirmationText}
          </button>
          <button
            onClick={onCancel}
            className=" basis-1/2  py-2 rounded-full text-xs font-semibold bg-[#f5f5f7] text-black"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
