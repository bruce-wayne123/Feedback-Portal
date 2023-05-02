const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback_controller");
router.get('/giveFeedBack/:id', feedbackController.giveFeedBack);
router.get('/myFeedBack/:id', feedbackController.myFeedBack);
router.post('/create', feedbackController.create);
router.get('/getFeedBack/:id', feedbackController.getFeedback);
module.exports = router;