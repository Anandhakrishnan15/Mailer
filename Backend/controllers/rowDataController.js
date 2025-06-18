const UserRowData = require('../models/UserRowData');

exports.addOrUpdateRow = async (req, res) => {
    const userId = req.user?.id;
    console.log("UserID:", userId);

    if (!userId) {
        return res.status(400).json({ error: "User not authenticated" });
    }

    const {
        id,
        data, // ← extract this
        isSubmitted,
        isEditing,
        lastEdited,
        checked,
        collected,
    } = req.body;

    // Destructure from data
    const {
        name,
        subject,
        quarry,
        to_email,
        attachment,
        note,
    } = data || {};

    try {
        let userDoc = await UserRowData.findOne({ user: userId });

        console.log("RowData Received:", {
            id,
            name,
            subject,
            quarry,
            to_email,
            attachment,
            note,
            isSubmitted,
            isEditing,
            lastEdited,
            checked,
            collected,
        });

        const newRow = {
            rowId: id || Math.random().toString(36).substr(2, 9),
            data: {
                name: name || "",
                subject: subject || "",
                quarry: quarry || "",
                to_email: to_email || "",
                attachment: attachment || "",
                note: note || false,
            },
            isSubmitted: isSubmitted || false,
            isEditing: isEditing !== undefined ? isEditing : true,
            lastEdited: lastEdited || null,
            checked: checked || false,
            collected: collected || false,
        };

        if (userDoc) {
            const existingIndex = userDoc.rows.findIndex(
                (r) => r.rowId === newRow.rowId
            );

            if (existingIndex !== -1) {
                userDoc.rows[existingIndex] = {
                    ...userDoc.rows[existingIndex],
                    ...newRow,
                };
                await userDoc.save();
                return res.status(200).json({
                    message: "Row updated successfully",
                    data: userDoc.rows[existingIndex],
                });
            } else {
                userDoc.rows.push(newRow);
                await userDoc.save();
                return res
                    .status(200)
                    .json({ message: "Row added to existing user", data: newRow });
            }
        } else {
            const newUserRowData = new UserRowData({
                user: userId,
                rows: [newRow],
            });

            await newUserRowData.save();
            return res
                .status(201)
                .json({ message: "Row added to new user document", data: newRow });
        }
    } catch (err) {
        console.error("Error saving row:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


// ✅ Check if a rowId already exists (no data is inserted or saved)
// controllers/rowDataController.js
exports.checkRowIdExists = async (req, res) => {
    const { rowId } = req.body;
    const userId = req.user?.id;

    if (!rowId || !userId) {
        return res.status(400).json({ exists: true, error: "Invalid input" });
    }

    try {
        const userData = await UserRowData.findOne({ user: userId });
        const exists = userData?.rows?.some((row) => row.rowId === rowId) || false;
        return res.status(200).json({ exists });
    } catch (err) {
        console.error("Check rowId error:", err);
        return res.status(500).json({ exists: true, error: "Server error" });
    }
};
  ;
  