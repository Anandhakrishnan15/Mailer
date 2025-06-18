// File: RowContext.jsx
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { checkRowId, submitRow } from "../Services/Api"; // Axios-based checkRowId function

const RowContext = createContext();

const generateRandomId = () => Math.random().toString(36).substr(2, 9);

export const RowProvider = ({ children }) => {
  const baseColumns = [
    "name",
    "subject",
    "quarry",
    "to_email",
    "attachment",
    "note",
  ];

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
  const [previewRowId, setPreviewRowId] = useState(null);
  const [checkAll, setCheckAll] = useState(false);

  const checkRowIdExists = async (rowId) => {
    try {
      const token = localStorage.getItem("token"); // or from context if stored there
      if (!token) {
        toast.error("No auth token found");
        return true;
      }

      const response = await checkRowId(rowId, token);
      return response.data.exists;
    } catch (err) {
      console.error("Error checking rowId:", err);
      return true; // assume exists if there's an error
    }
  };

  const handleAddRow = async () => {
    let uniqueId = generateRandomId();
    let attempts = 0;

    while (await checkRowIdExists(uniqueId)) {
      uniqueId = generateRandomId();
      attempts++;
      if (attempts > 5) {
        toast.error("Failed to generate unique ID. Try again.");
        return;
      }
    }

    setRows((prev) => [
      ...prev,
      {
        id: uniqueId,
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

  const handleInputChange = (e, rowId, col) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              data: {
                ...row.data,
                [col]: col === "note" ? e.target.checked : e.target.value,
              },
              lastEdited: new Date().toLocaleString(),
            }
          : row
      )
    );
  };

  const handlePreview = (rowId) => setPreviewRowId(rowId);


  const handleSubmitRow = async (rowId) => {
    const updatedRow = rows.find((row) => row.id === rowId);
    console.log(updatedRow);
    const userToken = localStorage.getItem("token"); // or from context if stored there

    const newRow = {
      ...updatedRow,
      isSubmitted: true,
      isEditing: false,
      lastEdited: new Date().toLocaleString(),
      data: { ...updatedRow.data, note: true },
    };

    try {
      // Call your API function (axios)
      await submitRow(newRow, userToken);

      // Update local state only after successful submission
      setRows((prev) => prev.map((row) => (row.id === rowId ? newRow : row)));

      toast.success(`Row ${rowId} submitted!`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit row");
      console.log(error);
    }
  };


  const handleRowGenerate = (rowId) => {
    const aiData = {
      name: `AI Name ${rowId}`,
      subject: `AI Subject ${rowId}`,
      quarry: `AI Quarry ${rowId}`,
      to_email: `ai-${rowId}@example.com`,
      attachment: `attachment-${rowId}.pdf`,
      note: true,
    };

    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              data: aiData,
              isEditing: false,
              lastEdited: new Date().toLocaleString(),
            }
          : row
      )
    );
    toast.info(`Row ${rowId} generated with AI data.`);
  };

  const handleEditRow = (rowId) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, isEditing: true } : row))
    );
    toast.info(`Row ${rowId} is now editable`);
  };

  const handleCheckAll = () => {
    const newVal = !checkAll;
    setCheckAll(newVal);
    setRows((prev) => prev.map((row) => ({ ...row, checked: newVal })));
  };

  const handleCheckRow = (rowId) => {
    const updatedRows = rows.map((row) =>
      row.id === rowId ? { ...row, checked: !row.checked } : row
    );
    setRows(updatedRows);
    setCheckAll(updatedRows.every((r) => r.checked));
  };

  const handleGenerateAll = () => {
    const selected = rows.filter((r) => r.checked);

    if (selected.length === 0) {
      toast.error("No rows selected to generate.");
      return;
    }

    const updatedRows = rows.map((row) => {
      if (row.checked) {
        const aiData = {
          name: `AI Gen ${row.id}`,
          subject: `Subject ${row.id}`,
          quarry: `Quarry ${row.id}`,
          to_email: `bulk-${row.id}@example.com`,
          attachment: `bulk-${row.id}.pdf`,
          note: true,
        };

        return {
          ...row,
          data: aiData,
          collected: true,
          isEditing: false,
          lastEdited: new Date().toLocaleString(),
        };
      }
      return row;
    });

    setRows(updatedRows);
    toast.success("Generated all selected rows with AI!");
  };

  return (
    <RowContext.Provider
      value={{
        rows,
        baseColumns,
        checkAll,
        previewRowId,
        setPreviewRowId,
        handleInputChange,
        handleAddRow,
        handlePreview,
        handleSubmitRow,
        handleRowGenerate,
        handleEditRow,
        handleCheckAll,
        handleCheckRow,
        handleGenerateAll,
      }}
    >
      {children}
    </RowContext.Provider>
  );
};

export const useRows = () => useContext(RowContext);
