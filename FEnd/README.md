# 📋 DynamicTable Component – Feature Documentation

### 📅 Date: June 8, 2025  
### 🛠️ Summary: Enhancing dynamic table functionality with row submission, selection, preview, and batch generation logic.

---

## ✅ Features Implemented

### 1. 🧱 Row Data Structure Updates
Each row now includes the following keys:

```js
{
  id: Number,
  data: {
    name: String,
    subject: String,
    quarry: String,
    to_email: String,
    attachment: String,
    note: Boolean // Automatically set to true on submission
  },
  isSubmitted: Boolean,
  isEditing: Boolean,
  lastEdited: String | null,
  checked: Boolean,
  collected: Boolean
}
```

---

### 2. 📝 Row Submission (`handleSubmitRow`)
- Locks the row from further editing (`isEditing = false`)
- Marks it as submitted (`isSubmitted = true`)
- Sets `lastEdited` timestamp
- Automatically sets `note = true`
- Toast notification on success
- Console log for debug: ✅ Submitted Row

---

### 3. ✏️ Edit Row (`handleEditRow`)
- Makes a row editable again (`isEditing = true`)
- Shows info toast: *"Row #x is now editable"*

---

### 4. ☑️ Row Selection
#### `Check All` Toggle (`handleCheckAll`)
- Sets all row `checked` values to `true/false`
- Syncs state with `checkAll` checkbox

#### Individual Checkbox (`handleCheckRow`)
- Toggles only the clicked row’s `checked`
- Updates global `checkAll` state accordingly

---

### 5. ⚙️ Generate Action (`handleGenerate`)
- Filters rows where:
  - `checked = true`
  - `isSubmitted = true`
  - `collected = false`
- If none match, shows error: **"No submitted rows selected or all already collected."**
- Marks valid rows as `collected = true`
- Logs to console: ✅ Generated Rows

---

### 6. 🖼️ Preview Modal
- Triggered via `Eye` icon button
- Displays full row data using the `PreviewModal` component

---

### 7. 🧠 Smart UI States
- ✅ or ✏️ icons for submission status
- Disabled inputs unless row is in `isEditing` mode
- Disabled `Generate` button if no eligible rows
- Real-time timestamps for `lastEdited`

---

## 🚀 Workflow Summary

1. Add new row → Fill fields  
2. Submit row → Lock + Save timestamp + note set to `true`  
3. Select rows with checkboxes  
4. Click **Generate** → Process rows → Mark as collected  
5. Re-edit any row if needed

---

## 📦 Component Behavior in Code

| Feature         | Trigger                  | State Affected                          |
|----------------|--------------------------|------------------------------------------|
| Add Row         | `handleAddRow()`          | Adds a new row object                    |
| Input Change    | `handleInputChange()`     | Updates `data`, sets `lastEdited`        |
| Submit          | `handleSubmitRow()`       | Locks row, sets `note = true`            |
| Edit            | `handleEditRow()`         | Makes row editable again                 |
| Check All       | `handleCheckAll()`         | Sets all rows’ `checked` to toggle state |
| Check Row       | `handleCheckRow(rowIdx)`  | Toggles individual checkbox              |
| Generate        | `handleGenerate()`        | Logs & flags selected submitted rows     |

---

## 🛠 Technologies Used

- React (with hooks)
- `lucide-react` icons
- `react-toastify` for toast notifications
- Controlled inputs with real-time updates
- Modular `PreviewModal` for modal previewing

---

## 📎 Notes

- `note` field is programmatically set to `true` upon submission.
- `collected` field ensures rows are not double-processed.
- All logic ensures UI integrity between editable, locked, and processed rows.

---

> 💡 This documentation was auto-generated for developer handoff, contribution references, or team onboarding. You can place it in your `docs/` folder or `README.md`.