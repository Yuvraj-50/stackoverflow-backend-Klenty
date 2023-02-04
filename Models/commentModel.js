const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questionModel",
  },
  comment: String,

  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});

module.exports = new mongoose.model("commentModels", commentSchema);
