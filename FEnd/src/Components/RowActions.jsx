// File: RowActions.jsx
import React from "react";
import { Eye, CheckCircle, Edit3 } from "lucide-react";
import { useRows } from "../context/RowContext";

const RowActions = ({ rowId, isEditing }) => {
  const { handlePreview, handleSubmitRow, handleEditRow } = useRows();

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => handlePreview(rowId)}
        className="text-yellow-500 hover:scale-110 transition-transform duration-200"
        title="Preview"
      >
        <Eye className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleSubmitRow(rowId)}
        title="Submit"
        className={`transition-all duration-200 ${
          isEditing
            ? "text-green-600 hover:text-green-700 hover:scale-110"
            : "text-gray-500"
        }`}
      >
        <CheckCircle className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleEditRow(rowId)}
        className="text-indigo-500 hover:text-indigo-600 hover:scale-110 transition-transform duration-200"
        title="Edit"
      >
        <Edit3 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default RowActions;
