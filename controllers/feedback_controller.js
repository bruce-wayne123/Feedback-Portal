const FeedBack = require("../models/feedback");
const Employee = require("../models/employee");
module.exports.getFeedback = async function name(req, resp) {
    try {
        let message;
        let feedback;
        feedback = await FeedBack.find({ employeeId: req.params.id });
        if (feedback.length <= 0) {
            message = "No feedback data found";
        }
        else {
            message = "Feedback data";
        }
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
                employeeName: employee.name,
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

module.exports.update = async function (req, resp) {
    let requestBody = req.body;
    try {
        let feedback = await FeedBack.findById(requestBody.feedbackId);
        if (feedback) {
            feedback.teamwork = requestBody.teamwork;
            feedback.communication = requestBody.communication;
            feedback.accuracyOfWork = requestBody.accuracyOfWork;
            feedback.attendance = requestBody.attendance;
            await feedback.save();
        }
        else {
            console.log("No employee found");
        }
        return resp.redirect('back');
    } catch (error) {
        console.log(error);
    }
};

module.exports.myFeedBack = async function (req, resp) {
    return resp.render("myFeedBack", { title: "My FeedBack", empId: req.params.id });
}

module.exports.allFeedBack = async function (req, resp) {
    return resp.render("allfeedback", { title: "All FeedBacks" });
}

module.exports.getAllFeedBacks = async function (req, resp) {
    let feedbacks = await FeedBack.find({});
    if (feedbacks.length <= 0) {
        message = "No feedback data found";
    }
    else {
        message = "Feedback data";
    }
    return resp.json(200, {
        message: message,
        feedbacks: feedbacks,
    });
}

module.exports.giveFeedBack = async function (req, resp) {
    let employees = await Employee.find({});
    let employeesList = employees.filter(employee => (employee.name !== 'admin' && employee.id !== req.params.id));
    return resp.render("giveFeedBack", { title: "Evaluate FeedBack", employees: employeesList });
}

module.exports.updateFeedback = async function (req, resp) {
    let feedback = await FeedBack.findById(req.params.id);
    return resp.render("feedbackDetails", { title: "Feedback Details", feedback: feedback });
}

module.exports.deleteFeedback = async function (req, resp) {
    await FeedBack.findByIdAndDelete(req.params.id);
    resp.redirect('back');
}