const express = require("express");
const router = express.Router();

const { post_answer } = require("../controllers/answerController");

router.post("/postanswer/:questions_id", post_answer);


module.exports = router;