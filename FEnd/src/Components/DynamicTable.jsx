// import React, { useState } from "react";
// import { Eye, CheckCircle, Edit3, CloudUpload } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PreviewModal from "./PreviewModal";

// const generateRandomId = () => Math.floor(100000 + Math.random() * 900000);

// const DynamicTable = () => {
//   const baseColumns = [
//     "name",
//     "subject",
//     "quarry",
//     "to_email",
//     "attachment",
//     "note",
//   ];

//   const [previewRowId, setPreviewRowId] = useState(null);
//   const [checkAll, setCheckAll] = useState(false);
//   const [rows, setRows] = useState([
//     {
//       id: generateRandomId(),
//       data: {
//         name: "",
//         subject: "",
//         quarry: "",
//         to_email: "",
//         attachment: "",
//         note: false,
//       },
//       isSubmitted: false,
//       isEditing: true,
//       lastEdited: null,
//       checked: false,
//       collected: false,
//     },
//   ]);

//   const handleAddRow = () => {
//     setRows((prev) => [
//       ...prev,
//       {
//         id: generateRandomId(),
//         data: {
//           name: "",
//           subject: "",
//           quarry: "",
//           to_email: "",
//           attachment: "",
//           note: false,
//         },
//         isSubmitted: false,
//         isEditing: true,
//         lastEdited: null,
//         checked: false,
//         collected: false,
//       },
//     ]);
//   };

//   const handleInputChange = (e, rowId, col) => {
//     setRows((prev) =>
//       prev.map((row) =>
//         row.id === rowId
//           ? {
//               ...row,
//               data: {
//                 ...row.data,
//                 [col]: col === "note" ? e.target.checked : e.target.value,
//               },
//               lastEdited: new Date().toLocaleString(),
//             }
//           : row
//       )
//     );
//   };

//   const handlePreview = (rowId) => {
//     setPreviewRowId(rowId);
//   };

//   const handleSubmitRow = (rowId) => {
//     const submittedRow = rows.find((row) => row.id === rowId);
//     if (submittedRow) {
//       console.log("Submitted row data:", {
//         ...submittedRow,
//         isSubmitted: true,
//         isEditing: false,
//         lastEdited: new Date().toLocaleString(),
//         data: {
//           ...submittedRow.data,
//           note: true,
//         },
//       });
//     }

//     setRows((prev) =>
//       prev.map((row) =>
//         row.id === rowId
//           ? {
//               ...row,
//               isSubmitted: true,
//               isEditing: false,
//               lastEdited: new Date().toLocaleString(),
//               data: {
//                 ...row.data,
//                 note: true,
//               },
//             }
//           : row
//       )
//     );

//     toast.success(`Row ${rowId} submitted!`);
//   };
  

//   const handleRowGenerate = (rowId) => {
//     const generatedRow = rows.find((row) => row.id === rowId);
//     const uniqueAI = {
//       name: `AI Name ${rowId}`,
//       subject: `AI Subject ${rowId}`,
//       quarry: `AI Quarry ${rowId}`,
//       to_email: `ai-${rowId}@example.com`,
//       attachment: `attachment-${rowId}.pdf`,
//       note: true,
//     };

//     console.log("Generated AI row data:", {
//       ...generatedRow,
//       data: uniqueAI,
//       isEditing: false,
//       lastEdited: new Date().toLocaleString(),
//     });

//     const updatedRows = rows.map((row) => {
//       if (row.id === rowId) {
//         toast.info(`Row ${rowId} generated with AI data.`);
//         return {
//           ...row,
//           data: uniqueAI,
//           isEditing: false,
//           lastEdited: new Date().toLocaleString(),
//         };
//       }
//       return row;
//     });

//     setRows(updatedRows);
//   };
  

//   const handleEditRow = (rowId) => {
//     setRows((prev) =>
//       prev.map((row) => (row.id === rowId ? { ...row, isEditing: true } : row))
//     );
//     toast.info(`Row ${rowId} is now editable`);
//   };

//   const getStatus = (row) => {
//     if (row.isEditing) return { icon: "✏️", label: "Editable" };
//     return { icon: "✅", label: "Locked" };
//   };

//   const handleCheckAll = () => {
//     const newVal = !checkAll;
//     setCheckAll(newVal);
//     setRows((prev) => prev.map((row) => ({ ...row, checked: newVal })));
//   };

//   const handleCheckRow = (rowId) => {
//     const updatedRows = rows.map((row) =>
//       row.id === rowId ? { ...row, checked: !row.checked } : row
//     );
//     setRows(updatedRows);
//     setCheckAll(updatedRows.every((r) => r.checked));
//   };

//   const handleGenerateAll = () => {
//     const selected = rows.filter((r) => r.checked);

//     if (selected.length === 0) {
//       toast.error("No rows selected to generate.");
//       return;
//     }

//     const generatedRowsData = [];

//     const updatedRows = rows.map((row) => {
//       if (row.checked) {
//         const uniqueAI = {
//           name: `AI Gen ${row.id}`,
//           subject: `Subject ${row.id}`,
//           quarry: `Quarry ${row.id}`,
//           to_email: `bulk-${row.id}@example.com`,
//           attachment: `bulk-${row.id}.pdf`,
//           note: true,
//         };

//         const updatedRow = {
//           ...row,
//           data: uniqueAI,
//           collected: true,
//           isEditing: false,
//           lastEdited: new Date().toLocaleString(),
//         };

//         generatedRowsData.push(updatedRow); // collect data

//         return updatedRow;
//       }
//       return row;
//     });

//     setRows(updatedRows);
//     toast.success("Generated all selected rows with AI!");

//     console.log("Generated AI data for selected rows:", generatedRowsData);
//   };
  

//   const canGenerate = rows.some((r) => r.checked);

//   return (
//     <div className="p-4 space-y-4">
//       <ToastContainer position="bottom-right" autoClose={2000} />

//       {/* Header Controls */}

//       <button
//         onClick={handleAddRow}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         + Add Row
//       </button>

//       <table className="table-auto w-full border border-gray-400 mt-4">
//         <thead>
//           <tr>
//             <th className="border px-3 py-2 text-center">
//               <div className="flex gap-2 items-center">
//                 <input
//                   type="checkbox"
//                   checked={checkAll}
//                   onChange={handleCheckAll}
//                 />
//                 <span className="text-sm">✔All</span>
//               </div>
//             </th>
//             <th className="border px-3 py-2">#</th>
//             <th className="border px-3 py-2">ID</th>
//             {baseColumns.map((col, idx) => (
//               <th key={idx} className="border px-3 py-2 capitalize">
//                 {col.replace("_", " ")}
//               </th>
//             ))}
//             <th className="border px-3 py-2">Generate</th>
//             <th className="border px-3 py-2">Status</th>
//             <th className="border px-3 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => {
//             const status = getStatus(row);
//             return (
//               <tr key={row.id}>
//                 <td className="border px-3 py-2 text-center">
//                   <input
//                     type="checkbox"
//                     checked={row.checked}
//                     onChange={() => handleCheckRow(row.id)}
//                   />
//                 </td>
//                 <td className="border px-3 py-2 text-center">{index + 1}</td>
//                 <td className="border px-3 py-2 text-center">{row.id}</td>
//                 {baseColumns.map((col, colIdx) => (
//                   <td key={colIdx} className="border px-3 py-2">
//                     {col === "note" ? (
//                       <input
//                         type="checkbox"
//                         checked={row.data[col]}
//                         onChange={(e) => handleInputChange(e, row.id, col)}
//                         disabled={!row.isEditing}
//                       />
//                     ) : (
//                       <input
//                         type="text"
//                         value={row.data[col]}
//                         onChange={(e) => handleInputChange(e, row.id, col)}
//                         disabled={!row.isEditing}
//                         className="w-full px-2 py-1 border rounded"
//                       />
//                     )}
//                   </td>
//                 ))}
//                 <td className="border px-3 py-2 text-center">
//                   <button
//                     className={`transition-all duration-200 ${
//                       row.isEditing
//                         ? "text-green-600 hover:text-green-700 hover:scale-110"
//                         : "text-gray-500"
//                     }`}
//                     onClick={() => handleRowGenerate(row.id)}
//                   >
//                     <CloudUpload className="w-5 h-5" />
//                   </button>
//                 </td>
//                 <td className="border px-3 py-2 text-center text-sm">
//                   <span className="text-lg">{status.icon}</span>
//                   <br />
//                   <span className="text-xs text-gray-600">{status.label}</span>
//                 </td>
//                 <td className="border px-3 py-2">
//                   <div className="flex items-center justify-center gap-4">
//                     <button
//                       onClick={() => handlePreview(row.id)}
//                       className="text-yellow-500 hover:scale-110 transition-transform duration-200"
//                       title="Preview"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleSubmitRow(row.id)}
//                       title="Submit"
//                       className={`transition-all duration-200 ${
//                         row.isEditing
//                           ? "text-green-600 hover:text-green-700 hover:scale-110"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       <CheckCircle className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleEditRow(row.id)}
//                       className="text-indigo-500 hover:text-indigo-600 hover:scale-110 transition-transform duration-200"
//                       title="Edit"
//                     >
//                       <Edit3 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="flex items-center justify-between">
//         <button
//           className={`px-4 py-2 rounded text-white text-sm font-medium transition-colors duration-300 ${
//             canGenerate
//               ? "bg-blue-600 hover:bg-blue-700"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//           onClick={handleGenerateAll}
//           disabled={!canGenerate}
//         >
//           Generate All
//         </button>
//       </div>

//       {previewRowId !== null && (
//         <PreviewModal
//           isOpen={previewRowId !== null}
//           onClose={() => setPreviewRowId(null)}
//           rowData={rows.find((r) => r.id === previewRowId)}
//           rowIndex={rows.findIndex((r) => r.id === previewRowId)}
//         />
//       )}
//     </div>
//   );
// };

// export default DynamicTable;

// File: DynamicTable.jsx
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRows } from "../context/RowContext";
import TableRow from "./TableRow";
import PreviewModal from "./PreviewModal";

const DynamicTable = () => {
  const baseColumns = [
    "name",
    "subject",
    "quarry",
    "to_email",
    "attachment",
    "note",
  ];

  const {
    rows,
    previewRowId,
    checkAll,
    handleAddRow,
    handleCheckAll,
    handleGenerateAll,
    setPreviewRowId,
  } = useRows();

  const canGenerate = rows.some((r) => r.checked);

  return (
    <div className="p-4 space-y-4">
      <ToastContainer position="bottom-right" autoClose={2000} />

      {/* Header Controls */}
      <button
        onClick={handleAddRow}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Row
      </button>

      <table className="table-auto w-full border border-gray-400 mt-4">
        <thead>
          <tr>
            <th className="border px-3 py-2 text-center">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={checkAll}
                  onChange={handleCheckAll}
                />
                <span className="text-sm">✔All</span>
              </div>
            </th>
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">ID</th>
            {baseColumns.map((col, idx) => (
              <th key={idx} className="border px-3 py-2 capitalize">
                {col.replace("_", " ")}
              </th>
            ))}
            <th className="border px-3 py-2">Generate</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <TableRow
              key={row.id}
              row={row}
              index={index}
              columns={baseColumns}
            />
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between">
        <button
          className={`px-4 py-2 rounded text-white text-sm font-medium transition-colors duration-300 ${
            canGenerate
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleGenerateAll}
          disabled={!canGenerate}
        >
          Generate All
        </button>
      </div>

      {previewRowId !== null && (
        <PreviewModal
          isOpen={previewRowId !== null}
          onClose={() => setPreviewRowId(null)}
          rowData={rows.find((r) => r.id === previewRowId)}
          rowIndex={rows.findIndex((r) => r.id === previewRowId)}
        />
      )}
    </div>
  );
};

export default DynamicTable;
