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


module.exports = { post_answer };