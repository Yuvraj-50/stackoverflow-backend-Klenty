const mongoose = require("mongoose");

const { Schema } = mongoose;

const answerSchema = new Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questionModel",
  },
  answer: String,

  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "commentModel",
  },
});

module.exports = mongoose.model("answerModels", answerSchema);
