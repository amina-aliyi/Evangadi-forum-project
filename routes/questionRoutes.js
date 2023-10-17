const express = require("express");

const router = express.Router();

const {postQuestions,allQuestions,singleQuestion} = require("../controllers/questionController");

// post questions route
router.post("/ask", postQuestions);

// all questions route
router.get("/all-questions", allQuestions);

//single question route
router.get("/single-question/:questions_id", singleQuestion);

module.exports = router;
