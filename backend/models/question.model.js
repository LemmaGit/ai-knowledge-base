const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String },
    askedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    articleRef: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
