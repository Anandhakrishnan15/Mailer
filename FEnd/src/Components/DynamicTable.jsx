import React, { useState } from "react";
import { Eye, Send, Pencil, CheckCircle, Edit3 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreviewModal from "./PreviewModal";

const generateRandomId = () => Math.floor(100000 + Math.random() * 900000);

const DynamicTable = () => {
  const baseColumns = [
    "name",
    "subject",
    "quarry",
    "to_email",
    "attachment",
    "note",
  ];

  const [previewRow, setPreviewRow] = useState(null);
  const [checkAll, setCheckAll] = useState(false);
  const [rows, setRows] = useState([
    {
      id: generateRandomId(),
      data: {
        name: "",
        subject: "",
        quarry: "",
        to_email: "",
        attachment: "",
        note: false,
      },
      isSubmitted: false,
      isEditing: true,
      lastEdited: null,
      checked: false,
      collected: false,
    },
  ]);

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: generateRandomId(),
        data: {
          name: "",
          subject: "",
          quarry: "",
          to_email: "",
          attachment: "",
          note: false,
        },
        isSubmitted: false,
        isEditing: true,
        lastEdited: null,
        checked: false,
        collected: false,
      },
    ]);
  };

  const handleInputChange = (e, rowIdx, col) => {
    const updatedRows = [...rows];
    updatedRows[rowIdx].data[col] =
      col === "note" ? e.target.checked : e.target.value;
    updatedRows[rowIdx].lastEdited = new Date().toLocaleString();
    setRows(updatedRows);
  };

  const handlePreview = (rowIdx) => {
    setPreviewRow(rowIdx);
  };

  const handleSubmitRow = (rowIdx) => {
    const updatedRows = [...rows];
    updatedRows[rowIdx].isSubmitted = true;
    updatedRows[rowIdx].isEditing = false;
    updatedRows[rowIdx].lastEdited = new Date().toLocaleString();
    updatedRows[rowIdx].data.note = true; // Ensure note is true on submit
    setRows(updatedRows);
    toast.success(`Row #${rowIdx + 1} submitted!`);
    console.log("✅ Submitted Row:", updatedRows[rowIdx]);
  };

  const handleEditRow = (rowIdx) => {
    const updatedRows = [...rows];
    updatedRows[rowIdx].isEditing = true;
    setRows(updatedRows);
    toast.info(`Row #${rowIdx + 1} is now editable`);
  };

  const getStatus = (row) => {
    if (row.isEditing) return { icon: "✏️", label: "Editable" };
    return { icon: "✅", label: "Locked" };
  };

  const handleCheckAll = () => {
    const newVal = !checkAll;
    setCheckAll(newVal);
    setRows((prev) => prev.map((row) => ({ ...row, checked: newVal })));
  };

  const handleCheckRow = (rowIdx) => {
    const updatedRows = [...rows];
    updatedRows[rowIdx].checked = !updatedRows[rowIdx].checked;
    setRows(updatedRows);
    setCheckAll(updatedRows.every((r) => r.checked));
  };

  const handleGenerate = () => {
    const selected = rows.filter(
      (r) => r.checked && r.isSubmitted && !r.collected
    );

    if (selected.length === 0) {
      toast.error("No submitted rows selected or all already collected.");
      return;
    }

    const updatedRows = rows.map((row) => {
      if (row.checked && row.isSubmitted && !row.collected) {
        return { ...row, collected: true };
      }
      return row;
    });

    setRows(updatedRows);
    console.log("✅ Generated Rows:", selected);
  };

  const canGenerate = rows.some(
    (r) => r.checked && r.isSubmitted && !r.collected
  );

  return (
    <div className="p-4 space-y-4">
      <ToastContainer position="bottom-right" autoClose={2000} />

      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <input type="checkbox" checked={checkAll} onChange={handleCheckAll} />
          <span className="text-sm">Check All</span>
        </div>
        <button
          className={`px-4 py-2 rounded text-white text-sm font-medium transition-colors duration-300 ${
            canGenerate
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleGenerate}
          disabled={!canGenerate}
        >
          Generate
        </button>
      </div>

      <button
        onClick={handleAddRow}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Row
      </button>

      <table className="table-auto w-full border border-gray-400 mt-4">
        <thead>
          <tr>
            <th className="border px-3 py-2 text-center">✔</th>
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">ID</th>
            {baseColumns.map((col, idx) => (
              <th key={idx} className="border px-3 py-2 capitalize">
                {col.replace("_", " ")}
              </th>
            ))}
            <th className="border px-3 py-2">Last Edited</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => {
            const status = getStatus(row);
            return (
              <tr key={row.id}>
                <td className="border px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={row.checked}
                    onChange={() => handleCheckRow(rowIdx)}
                  />
                </td>
                <td className="border px-3 py-2 text-center">{rowIdx + 1}</td>
                <td className="border px-3 py-2 text-center">{row.id}</td>
                {baseColumns.map((col, colIdx) => (
                  <td key={colIdx} className="border px-3 py-2">
                    {col === "note" ? (
                      <input
                        type="checkbox"
                        checked={row.data[col]}
                        onChange={(e) => handleInputChange(e, rowIdx, col)}
                        disabled={!row.isEditing}
                      />
                    ) : (
                      <input
                        type="text"
                        value={row.data[col]}
                        onChange={(e) => handleInputChange(e, rowIdx, col)}
                        disabled={!row.isEditing}
                        className="w-full px-2 py-1 border rounded"
                      />
                    )}
                  </td>
                ))}
                <td className="border px-3 py-2 text-sm text-gray-600">
                  {row.lastEdited || "—"}
                </td>
                <td className="border px-3 py-2 text-center text-sm">
                  <span className="text-lg">{status.icon}</span>
                  <br />
                  <span className="text-xs text-gray-600">{status.label}</span>
                </td>
                <td className="border px-3 py-2">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => handlePreview(rowIdx)}
                      className="text-yellow-500 hover:scale-110 transition-transform duration-200"
                      title="Preview"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleSubmitRow(rowIdx)}
                      title="Submit"
                      className={`transition-all duration-200 ${
                        row.isEditing
                          ? "text-green-600 hover:text-green-700 hover:scale-110"
                          : "text-gray-500"
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEditRow(rowIdx)}
                      className="text-indigo-500 hover:text-indigo-600 hover:scale-110 transition-transform duration-200"
                      title="Edit"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {previewRow !== null && (
        <PreviewModal
          isOpen={previewRow !== null}
          onClose={() => setPreviewRow(null)}
          rowData={rows[previewRow]}
          rowIndex={previewRow}
        />
      )}
    </div>
  );
};

export default DynamicTable;
