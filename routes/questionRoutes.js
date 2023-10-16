const express = require("express");

const router = express.Router();

const { postQuestions } = require("../controllers/questionController");

router.post("/ask", postQuestions);

module.exports = router;
