import React from "react";
import { MdDeleteForever } from "react-icons/md";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm  p-4 flex items-center justify-center z-50">
      <div className="bg-white p-6 border border-gray-400  shadow ">
        <h2 className="text-lg font-semibold mb-4  text-gray-900">
          Confirm Deletion?
        </h2>
        <p className="mb-4 text-gray-700">
          Are you sure you want to proceed deleting?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-gray-600 transition-all hover:text-black border py-2 px-4 border-gray-300 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-white transition-all bg-red-500 hover:bg-red-600 py-2 px-4 flex items-center gap-1 cursor-pointer"
          >
            <MdDeleteForever /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
