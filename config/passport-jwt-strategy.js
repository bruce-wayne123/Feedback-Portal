const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Employee = require("../models/employee");
let options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "123"
};

passport.use(new jwtStrategy(options, async function (jwtPayLoad, done) {
    try {
        let employee = await Employee.findById(jwtPayLoad._id).catch(function (error) {
            console.log('Error in finding user from JWT', error);
            return;
        });
        if (employee) {
            return done(null, user);
        }
    } catch (error) {
        return done(null, false);
    }
}));

module.exports = passport;