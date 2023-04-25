// backend/controllers/mangaController.js

const Manga = require("../models/manga");

// Lấy danh sách tất cả truyện
exports.getMangas = async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.status(200).json(mangas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin chi tiết của một truyện
exports.getMangaById = async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id);
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }
    res.status(200).json(manga);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm một truyện mới
exports.createManga = async (req, res) => {
  const { title, description, coverImage, author, status } = req.body;

  try {
    const newManga = new Manga({
      title,
      description,
      coverImage,
      author,
      status,
    });

    await newManga.save();
    res.status(201).json(newManga);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin của một truyện
exports.updateManga = async (req, res) => {
  try {
    const updatedManga = await Manga.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedManga) {
      return res.status(404).json({ message: "Manga not found" });
    }

    res.status(200).json(updatedManga);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa một truyện
exports.deleteManga = async (req, res) => {
  try {
    const deletedManga = await Manga.findByIdAndDelete(req.params.id);

    if (!deletedManga) {
      return res.status(404).json({ message: "Manga not found" });
    }

    res.status(200).json({ message: "Manga deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
