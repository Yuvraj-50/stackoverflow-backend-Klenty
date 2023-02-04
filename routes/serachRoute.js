const express = require("express");
const QuestionModel = require("../Models/questionModel.js");

const router = express.Router();

router.get("/:value", async (req, res) => {
  try {
    const searchValue = req.params.value;
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
                // answer: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]).exec();
    const data = allQuestionData.filter((data) => {
      if (
        data.title.includes(searchValue.toLowerCase()) ||
        data.tags.includes(searchValue.toLowerCase())
      ) {
        return data;
      }
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

module.exports = router;
