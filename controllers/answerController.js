const DbConection = require("../config/dbConfig");
const { StatusCodes } = require("http-status-codes");



//post answer
const post_answer = async (req, res) => {
  const { answer } = req.body;
  const question_id = req.params.questionid;
  const { userid } = req.user;
  if (!answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({msg:'provide answer field'})
  }
  try {
    await DbConection.query('INSERT INTO answer(questionid,userid, answer  ) value(?,?,?)',[ question_id, userid, answer,])

    return res.status(StatusCodes.OK).json({msg:'Answer posted successfully'})
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "somethin went to wrong try again later" });
  }
};
const getAnswerById = async (req, res) => {
  const answerId = req.params.answerid;
  //    const questionId = req.params.questionid;

  try {
    const [answer] = await dbConnection.query(
      "SELECT questionid, userid, answer FROM answers WHERE answerid = ?",
      [answerId]
    );

    if (answer.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Answer not found" });
    }

    return res.status(StatusCodes.OK).json({ answer });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

module.exports = { post_answer getAnswerById };
