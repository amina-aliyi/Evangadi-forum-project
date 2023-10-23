const express = require("express");
const router = express.Router();

const { post_answer,getAnswerById } = require("../controllers/answerController");

router.post("/postanswer/:questions_id", post_answer);
router.get("/answers/:answerid", getAnswerById);

module.exports = router;
