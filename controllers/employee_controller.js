const Employee = require("../models/employee");
const fs = require('fs');
module.exports.getEmployees = async function name(req, resp) {
    try {
        let employeesList = await Employee.find({});
        return resp.json(200, {
            message: "List of employees",
            employees: employeesList
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.create = async function (req, resp) {
    let requestBody = req.body;
    try {
        let student = await Employee.find({ email: requestBody.email });
        let randomEmployeeId = Math.floor(Math.random() * 90000) + 10000;
        if (student) {
            await Employee.create({
                employeeId: randomEmployeeId,
                name: req.body.name,
                email: req.body.email,
                department: req.body.department,
                location: req.body.location
            });
        }
        else {
            console.log("Employee already exists - Unable to create");
        }
        return resp.render('dashboard', { title: "Dashboard" });
    } catch (error) {
        console.log(error);
    }
};

module.exports.addEmployee = async function (req, resp) {
    return resp.render("addemployee", { title: "Add Employee" });
}

module.exports.deleteEmployee = async function (req, resp) {

    console.log(req.params.id);
    let employee = await Employee.findByIdAndDelete(req.params.id);
    return resp.render('dashboard', { title: "Dashboard" });
}
