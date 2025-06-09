// File: TableRow.jsx
import React from "react";
import { useRows } from "../context/RowContext";
import RowActions from "./RowActions";
import { CloudUpload } from "lucide-react";

const TableRow = ({ row, index, columns }) => {
  const { handleCheckRow, handleInputChange, handleRowGenerate } = useRows();

  const getStatus = (row) => {
    if (row.isEditing) return { icon: "✏️", label: "Editable" };
    return { icon: "✅", label: "Locked" };
  };

  const status = getStatus(row);

  return (
    <tr>
      <td className="border px-3 py-2 text-center">
        <input
          type="checkbox"
          checked={row.checked}
          onChange={() => handleCheckRow(row.id)}
        />
      </td>
      <td className="border px-3 py-2 text-center">{index + 1}</td>
      <td className="border px-3 py-2 text-center">{row.id}</td>

      {columns.map((col, colIdx) => (
        <td key={colIdx} className="border px-3 py-2">
          {col === "note" ? (
            <input
              type="checkbox"
              checked={row.data[col]}
              onChange={(e) => handleInputChange(e, row.id, col)}
              disabled={!row.isEditing}
            />
          ) : (
            <input
              type="text"
              value={row.data[col]}
              onChange={(e) => handleInputChange(e, row.id, col)}
              disabled={!row.isEditing}
              className="w-full px-2 py-1 border rounded"
            />
          )}
        </td>
      ))}

      <td className="border px-3 py-2 text-center">
        <button
          className={`transition-all duration-200 ${
            row.isEditing
              ? "text-green-600 hover:text-green-700 hover:scale-110"
              : "text-gray-500"
          }`}
          onClick={() => handleRowGenerate(row.id)}
        >
          <CloudUpload className="w-5 h-5" />
        </button>
      </td>

      <td className="border px-3 py-2 text-center text-sm">
        <span className="text-lg">{status.icon}</span>
        <br />
        <span className="text-xs text-gray-600">{status.label}</span>
      </td>

      <td className="border px-3 py-2">
        <RowActions rowId={row.id} isEditing={row.isEditing} />
      </td>
    </tr>
  );
};

export default TableRow;
