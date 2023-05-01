const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback_controller");
router.get('/giveFeedBack/:id', feedbackController.giveFeedBack);
router.get('/myFeedBack', feedbackController.myFeedBack);
router.post('/create', feedbackController.create);
module.exports = router;