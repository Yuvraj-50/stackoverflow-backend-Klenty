const mongoose = require("mongoose");

const { Schema } = mongoose;

const answerSchema = new Schema(
  {
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questionModel",
    },
    answer: String,
    user: Object,
    comment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commentModel",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("answerModels", answerSchema);
