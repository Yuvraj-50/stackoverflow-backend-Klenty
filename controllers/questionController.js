const { default: mongoose } = require("mongoose");
const QuestionModel = require("../Models/questionModel.js");

const addQuestion = async (req, res) => {
  try {
    const { title, body, tags } = req.body;

    console.log(title, body, tags);

    if (!title) {
      return res.status(406).json({ msg: "title is required" });
    }
    const question = await QuestionModel({
      title,
      body,
      tags,
      user: req.user,
    });

    await question.save();
    return res.status(201).json({ msg: "question added successfully" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const allQuestionData = await QuestionModel.aggregate([
      {
        $lookup: {
          from: "commentmodels",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                comment: 1,
                createdAt: 1,
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "answermodels",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      // {
      //   $project: {
      //     __v: 0,
      //   },
      // },
      {
        $sort: { createdAt: -1 },
      },
    ]).exec();

    return res.status(200).json({ allQuestionData });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const getSingleQuestion = async (req, res) => {
  try {
    const id = req.params.question_id;
    const data = await QuestionModel.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "answermodels",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                user: 1,
                answer: 1,
                question_id: 1,
                createdAt: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $lookup: {
          from: "commentmodels",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                question_id: 1,
                user: 1,
                comment: 1,
                createdAt: 1,
              },
            },
          ],
          as: "commentDetails",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]).exec();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = { addQuestion, getAllQuestions, getSingleQuestion };
