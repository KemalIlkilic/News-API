const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "News title must be provided"],
  },
  description: {
    type: String,
    required: [true, "News description must be provided"],
  },
  urlToImage: {
    type: String,
    required: [true, "News image URL must be provided"],
  },
  url: {
    type: String,
    required: [true, "News URL must be provided"],
    unique: true,
  },
  summary: {
    type: String,
    default: "Summary did not exist",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Articles", articlesSchema);
