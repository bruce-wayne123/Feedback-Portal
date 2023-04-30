const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/feedback");

const db = mongoose.connection;

db.on("error", function (error) {
    console.log("Error in connecting to the mongoose database ", error);
});

db.once("open", function () {
    console.log("Connected to the database :: MongoDB");
})

module.exports = db;