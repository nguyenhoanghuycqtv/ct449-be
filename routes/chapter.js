// backend/routes/chapterRoutes.js

const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapter");

// Lấy danh sách chapter của một truyện
router.get("/manga/:mangaId/chapters", chapterController.getChaptersByMangaId);

// Lấy thông tin chi tiết của một chapter
router.get("/chapters/:id", chapterController.getChapterById);

// Thêm một chapter mới
router.post("/chapters", chapterController.createChapter);

// Cập nhật thông tin của một chapter
router.put("/chapters/:id", chapterController.updateChapter);

// Xóa một chapter
router.delete("/chapters/:id", chapterController.deleteChapter);

router.get("/chapters/:id/navigate", chapterController.navigateChapter);

module.exports = router;
