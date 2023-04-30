const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const usersController = require("../controllers/users_controller");
router.get('/login', usersController.login);
router.get('/logout', usersController.destroySession);
router.get('/signup', usersController.signup);
router.get('/dashboard/:id', passport.checkAuthentication, usersController.dashboard);
// //Use passport as middleware to auuthenticate
router.post("/createSession", passport.authenticate('local', { failureRedirect: "/users/login" }), usersController.createSession);
router.post('/create', usersController.create);
module.exports = router;