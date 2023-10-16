const dbConnection = require("../config/dbConfig");
const { StatusCodes } = require("http-status-codes");
const uuid = require("uuid");

async function postQuestions(req, res) {
  const { title, description, tag } = req.body;

  if (!title || !description || !tag) {
    return res.status(400).json({ msg: "Please provide all information" });
  }

  try {
    const userid = req.user.userid;
    const questionid = uuid.v4();
    // console.log(questionid);

    await dbConnection.query(
      "INSERT INTO questions (questionid, title, description, tag, userid) VALUES (?, ?, ?, ?, ?)",
      [questionid, title, description, tag, userid]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question posted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something wents wrong, please try again later" });
  }
}

module.exports = { postQuestions };
