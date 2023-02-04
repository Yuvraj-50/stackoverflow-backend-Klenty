const express = require("express");

const router = express.Router();

const { addComment } = require("../controllers/commentController");

router.post("/:commentId", addComment);

module.exports = router;
