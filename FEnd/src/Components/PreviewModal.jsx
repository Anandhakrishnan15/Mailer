import React from "react";

const PreviewModal = ({ isOpen, onClose, rowData, rowIndex }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Close Preview"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Preview Row #{rowIndex + 1}
        </h2>
        <div className="space-y-2 text-gray-800">
          {Object.entries(rowData.data).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b py-1">
              <span className="font-medium capitalize">
                {key.replace("_", " ")}
              </span>
              <span>
                {typeof value === "boolean"
                  ? value
                    ? "Yes"
                    : "No"
                  : value || "—"}
              </span>
            </div>
          ))}
          <div className="flex justify-between border-b py-1">
            <span className="font-medium">ID</span>
            <span>{rowData.id}</span>
          </div>
          <div className="flex justify-between border-b py-1">
            <span className="font-medium">Last Edited</span>
            <span>{rowData.lastEdited || "—"}</span>
          </div>
          <div className="flex justify-between border-b py-1">
            <span className="font-medium">Submitted</span>
            <span>{rowData.isSubmitted ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
