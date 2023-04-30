const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/employee');
//authentication using passport JS
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    async function (req, email, password, done) {
        //find a user and establish the identity
        let user = await Employee.findOne({ email: email })
            .catch(function (error) {
                console.log("error", "Error in find the user");
            });
        if (!user || user.password != password) {
            console.log("error", "Invalid Username/Password");
            return done(null, false);
        }
        return done(null, user);
    }
));

//serialising the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//de-serialising the user to decide which key is to be kept in the cookies
passport.deserializeUser(async function (id, done) {
    let user = await Employee.findById({ _id: id })
        .catch(function (error) {
            console.log("Eror in finding user for auth", error);
            return done(error);
        });
    return done(null, user);
});

passport.checkAuthentication = function (req, resp, next) {
    //If user is signed in,pass on the request to next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }
    //If user is not signed in
    return resp.redirect("/users/login");
}
passport.SetAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;