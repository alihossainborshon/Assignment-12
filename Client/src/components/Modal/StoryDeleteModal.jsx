import React from "react";
import { motion as Motion } from "framer-motion";

export const StoryDeleteModal = ({ isOpen, closeModal, handleConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <Motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Delete Story
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold">{title}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition-all"
          >
            Confirm
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl shadow hover:bg-gray-400 transition-all"
          >
            Cancel
          </button>
        </div>
      </Motion.div>
    </div>
  );
};
