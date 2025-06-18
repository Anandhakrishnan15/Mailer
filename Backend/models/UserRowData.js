const mongoose = require('mongoose');

const SingleRowSchema = new mongoose.Schema({
    rowId: { type: String, required: true },
    data: {
        name: { type: String, default: "" },
        subject: { type: String, default: "" },
        quarry: { type: String, default: "" },
        to_email: { type: String, default: "" },
        attachment: { type: String, default: "" },
        note: { type: Boolean, default: false }
    },
    isSubmitted: { type: Boolean, default: false },
    isEditing: { type: Boolean, default: true },
    lastEdited: { type: Date, default: null },
    checked: { type: Boolean, default: false },
    collected: { type: Boolean, default: false }
}, { _id: false });

const UserRowDataSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    rows: [SingleRowSchema]
}, { timestamps: true });

module.exports = mongoose.model('UserRowData', UserRowDataSchema);
