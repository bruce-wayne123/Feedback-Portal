const FeedBack = require("../models/feedback");
const Employee = require("../models/employee");
module.exports.getFeedback = async function name(req, resp) {
    try {
        let message;
        let feedback = await FeedBack.find({ employeeId: req.params.id });
       
            
        if (feedback.length <= 0) {
            message = "No feedback data found";
        }
        else {
            message = "Feedback data";
        }
        console.log("Feedback API response", feedback);
        return resp.json(200, {
            message: message,
            feedback: feedback,
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.create = async function (req, resp) {
    let requestBody = req.body;
    console.log(requestBody);

    try {
        let employee = await Employee.findById(requestBody.employee);
        if (employee) {
            await FeedBack.create({
                employeeId: employee._id,
                teamwork: requestBody.teamwork,
                communication: requestBody.communication,
                accuracyOfWork: requestBody.accuracyOfWork,
                attendance: requestBody.attendance,
                remarks: requestBody.remarks
            });
        }
        return resp.render('dashboard', { title: "Dashboard" });
    } catch (error) {
        console.log(error);
    }
};

module.exports.myFeedBack = async function (req, resp) {

    return resp.render("myFeedBack", { title: "My FeedBack", empId: req.params.id });
}

module.exports.giveFeedBack = async function (req, resp) {
    let employees = await Employee.find({});
    let employeesList = employees.filter(employee => (employee.name !== 'admin' && employee.id !== req.params.id));
    return resp.render("giveFeedBack", { title: "Evaluate FeedBack", employees: employeesList });
}