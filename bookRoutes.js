const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController.js");

const validateBook = (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title dan author wajib diisi" });
  }
  next(); // lanjut ke controller createBook
};

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", validateBook, createBook);
router.put("/:id", updateBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
