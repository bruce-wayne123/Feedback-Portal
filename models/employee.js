const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
        },
        department: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;