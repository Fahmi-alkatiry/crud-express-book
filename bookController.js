const fs = require("fs");

// Helper baca dan tulis JSON
const readBooks = () => {
  const data = fs.readFileSync("src/book.json", "utf8");
  return JSON.parse(data);
};

const writeBooks = (data) => {
  fs.writeFileSync("src/book.json", JSON.stringify(data, null, 2));
};

// 🔵 READ - semua buku
exports.getAllBooks = (req, res) => {
  const {search} = req.query;
  if (search) {
    const books = readBooks();
    const filtered = books.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );
    res.json(filtered);
    return;
  }else{
    console.log("Tidak ada query");
    const books = readBooks();
    res.json(books);
  }
};


exports.getBookById = (req, res) => {
  const books = readBooks();
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

exports.createBook = (req, res) => {
  const books = readBooks();

  // Tentukan id baru berdasarkan panjang array
  const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;

  const newBook = {
    id: newId,
    title: req.body.title,
    author: req.body.author,
  };

  books.push(newBook);
  writeBooks(books);

  res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
  const books = readBooks();
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books[index] = { ...books[index], ...req.body };
  writeBooks(books);
  res.json(books[index]);
};

// 🔴 DELETE - hapus buku by ID
exports.deleteBook = (req, res) => {
  const books = readBooks();
  const filtered = books.filter((b) => b.id !== parseInt(req.params.id));
  if (filtered.length === books.length)
    return res.status(404).json({ message: "Book not found" });

  writeBooks(filtered);
  res.json({ message: "Book deleted successfully" });
};
