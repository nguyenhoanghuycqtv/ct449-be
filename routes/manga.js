// backend/routes/mangaRoutes.js

const express = require("express");
const router = express.Router();
const mangaController = require("../controllers/manga");

// Lấy danh sách tất cả truyện
router.get("/mangas", mangaController.getMangas);

// Lấy thông tin chi tiết của một truyện
router.get("/mangas/:id", mangaController.getMangaById);

// Thêm một truyện mới
router.post("/mangas", mangaController.createManga);

// Cập nhật thông tin của một truyện
router.put("/mangas/:id", mangaController.updateManga);

// Xóa một truyện
router.delete("/mangas/:id", mangaController.deleteManga);

module.exports = router;
