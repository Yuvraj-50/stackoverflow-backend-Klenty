const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionSchema = new Schema({
  title: String,
  body: String,
  tags: [],
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

module.exports = mongoose.model("questionModels", questionSchema);
