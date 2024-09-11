const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
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
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: [true, "News category must be provided"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("News", newsSchema);
