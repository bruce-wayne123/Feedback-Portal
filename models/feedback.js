const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
        },
        employeeName: {
            type: String,
        },
        teamwork: {
            type: String,
            required: true,
        },
        communication: {
            type: String,
            required: true,
        },
        accuracyOfWork: {
            type: String,
            required: true,
        },
        attendance: {
            type: String,
            required: true,
        },
        remarks: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;