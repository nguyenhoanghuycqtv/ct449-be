// backend/models/Chapter.js

const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  manga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manga",
    required: true,
  },
  chapterNumber: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chapter", ChapterSchema);
