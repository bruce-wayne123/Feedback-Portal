const Employee = require("../models/employee");
module.exports.login = function (req, resp) {
    if (req.isAuthenticated()) {
        let dashboardURL = `/users/dashboard/${req.user.id}`;
        return resp.redirect(dashboardURL);
    }
    return resp.render("login", { title: "" });
}
module.exports.signup = function (req, resp) {
    return resp.render("signup", { title: "Sign Up" });
}

module.exports.create = async function (req, resp) {
    let requestBody = req.body;
    try {
        if (requestBody.password != requestBody.confirmpassword) {
            console.log("Password dont match");
            return resp.redirect("/");
        }

        let employee = await Employee.find({ email: requestBody.email });
        if (employee) {
            await Employee.create({ name: requestBody.name, email: requestBody.email, password: requestBody.password });
        }
        else {
            console.log("Employee already exists - Unable to create");
            return resp.redirect("/");
        }
        return resp.render("login", { title: "" });

    } catch (error) {
        console.log(error);
    }
};

module.exports.createSession = function (req, resp) {
    try {
        if (req.isAuthenticated()) {
            let dashboardURL = `/users/dashboard/${req.user.id}`;
            return resp.redirect(dashboardURL);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.destroySession = function (req, resp) {
    req.logout(function (err) {
        if (err) { console.log(err); }
        // req.flash("success", 'You have logged out !');
        resp.redirect('/');
    });
};

module.exports.dashboard = async function (req, resp) {
    return resp.render('dashboard', { title: "Dashboard" });
}