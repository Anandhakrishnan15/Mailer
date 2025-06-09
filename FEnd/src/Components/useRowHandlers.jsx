import { useRows } from "../context/RowContext";
// import { toast } from "react-toastify";
import { generateRandomId } from "../utils/utils";

export const useRowHandlers = () => {
  const { rows, setRows, setCheckAll } = useRows();

  const handleAddRow = () => {
    const newRow = {
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
    };
    setRows((prev) => [...prev, newRow]);
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

  // Other methods like handleSubmitRow, handleGenerateAll, etc.
  return { handleAddRow, handleInputChange };
};
