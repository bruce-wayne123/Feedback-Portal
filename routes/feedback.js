const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback_controller");
router.get('/giveFeedBack/:id', feedbackController.giveFeedBack);
router.get('/myFeedBack/:id', feedbackController.myFeedBack);
router.post('/create', feedbackController.create);
router.get('/getFeedBack/:id', feedbackController.getFeedback);
router.get('/allFeedbacks', feedbackController.allFeedBack);
router.get('/getAllFeedBacks', feedbackController.getAllFeedBacks);
router.get("/deleteFeedBack/:id", feedbackController.deleteFeedback);
router.get('/feedbackDetails/:id', feedbackController.updateFeedback);
router.post('/updateFeedBack', feedbackController.update);
module.exports = router;