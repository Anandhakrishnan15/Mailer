const express = require('express');
const router = express.Router();
const rowDataController = require('../controllers/rowDataController');
const protect = require("../middleware/authMiddleware");

// ✅ POST row for the logged-in user
router.post('/rowpost', protect, rowDataController.addOrUpdateRow);

// ✅ GET all rows for logged-in user
router.get('/rowget', protect, async (req, res) => {
    try {
        const userDoc = await require('../models/UserRowData').findOne({ user: req.user.id });
        if (!userDoc) {
            return res.status(404).json({ error: 'No data found for this user' });
        }
        res.status(200).json(userDoc.rows);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ✅ POST /check-id → Check if a rowId already exists (no saving, just validation)
router.post('/check-id', protect, rowDataController.checkRowIdExists);

module.exports = router;
