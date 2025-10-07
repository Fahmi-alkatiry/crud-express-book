const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes.js');

app.use(express.json());

// Routing utama
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
