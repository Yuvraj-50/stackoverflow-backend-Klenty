const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questionModel",
    },
    comment: String,

    user: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("commentModels", commentSchema);
