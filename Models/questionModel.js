const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    title: String,
    body: String,
    tags: [],
    user: Object,
    comment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commentModel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("questionModels", questionSchema);
