const FeedBack = require("../models/feedback");
const Employee = require("../models/employee");
module.exports.getFeedbacks = async function name(req, resp) {
    // try {
    //     let employeesList = await Employee.find({});
    //     return resp.json(200, {
    //         message: "List of employees",
    //         employees: employeesList
    //     })
    // } catch (error) {
    //     console.log(error);
    // }
}

module.exports.create = async function (req, resp) {
    let requestBody = req.body;
    try {
        let employee = await Employee.find({ email: requestBody.email });
        let randomEmployeeId = Math.floor(Math.random() * 90000) + 10000;
        if (employee) {
            await Employee.create({
                employeeId: randomEmployeeId,
                name: req.body.name,
                email: req.body.email,
                department: req.body.department,
                location: req.body.location,
                password: 123
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

module.exports.myFeedBack = async function (req, resp) {
    return resp.render("myFeedBack", { title: "My FeedBack" });
}

module.exports.giveFeedBack = async function (req, resp) {
    let employees = await Employee.find({});
    let employeesList = employees.filter(employee => (employee.name !== 'admin' && employee.id !== req.params.id));
    return resp.render("giveFeedBack", { title: "Evaluate FeedBack", employees: employeesList });
}