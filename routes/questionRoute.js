const express = require("express");
const {
  addQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../controllers/questionController");

const router = express.Router();

router.post("/", addQuestion);

router.get("/", getAllQuestions);

router.get("/:question_id", getSingleQuestion);

module.exports = router;
