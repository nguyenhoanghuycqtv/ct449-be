// backend/controllers/chapterController.js

const Chapter = require("../models/chapter");
const Manga = require("../models/manga");

// Lấy danh sách chapter của một truyện
exports.getChaptersByMangaId = async (req, res) => {
  try {
    const chapters = await Chapter.find({ manga: req.params.mangaId });
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin chi tiết của một chapter
exports.getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm một chapter mới
exports.createChapter = async (req, res) => {
  const { mangaId, chapterNumber, content } = req.body;

  try {
    const manga = await Manga.findById(mangaId);
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }

    const newChapter = new Chapter({
      manga: mangaId,
      chapterNumber,
      content,
    });

    await newChapter.save();
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin của một chapter
exports.updateChapter = async (req, res) => {
  try {
    const updatedChapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedChapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.status(200).json(updatedChapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa một chapter
exports.deleteChapter = async (req, res) => {
  try {
    const deletedChapter = await Chapter.findByIdAndDelete(req.params.id);

    if (!deletedChapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.navigateChapter = async (req, res) => {
  try {
    const direction = parseInt(req.query.direction, 10);
    const currentChapter = await Chapter.findById(req.params.id);

    if (!currentChapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    const mangaId = currentChapter.manga;

    let nextChapter;
    if (direction === 1) {
      // Get next chapter
      nextChapter = await Chapter.findOne({
        manga: mangaId,
        chapterNumber: { $gt: currentChapter.chapterNumber },
      }).sort({ chapterNumber: 1 });
    } else if (direction === -1) {
      // Get previous chapter
      nextChapter = await Chapter.findOne({
        manga: mangaId,
        chapterNumber: { $lt: currentChapter.chapterNumber },
      }).sort({ chapterNumber: -1 });
    }

    if (!nextChapter) {
      return res.status(404).json({ message: "No more chapters available" });
    }

    res.status(200).json(nextChapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
