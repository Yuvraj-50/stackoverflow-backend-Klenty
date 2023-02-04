const answerModel = require("../Models/answerModel");

const addAnswer = async (req, res) => {
  try {
    const { answer, question_id } = req.body;

    if (!answer || !question_id) {
      return res.status(406).json({ err: "answer and question id required" });
    }

    const answerdata = await answerModel({
      answer,
      question_id,
      user: req.user,
    });

    await answerdata.save();

    res.status(201).json({ msg: "answer added successfully" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = { addAnswer };
