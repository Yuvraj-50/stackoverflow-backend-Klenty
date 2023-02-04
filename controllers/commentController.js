const commentModel = require("../Models/commentModel");

const addComment = async (req, res) => {
  try {
    const question_id = req.params.commentId;

    const { comment } = req.body;

    if (!comment.length) {
      return res.status(406).json({ err: "cannot add empty comment" });
    }

    const commentData = await commentModel({
      comment,
      question_id,
      user: req.user,
    });

    await commentData.save();

    return res.status(201).json({ msg: "comment added successfully" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = { addComment };
