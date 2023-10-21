const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'notes.html'));
// });

// API routes
app.get('/notes', (req, res) => {
  const notes = [
    { id: 1, title: 'Note 1', content: 'this is the first note' },
    { id: 2, title: 'Note 2', content: 'this is the second note' },
  ];
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const newNote = req.body;
  res.json(newNote);
});

app.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  res.sendStatus(204);
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server running on HTTP://localhost:${PORT}`);
});
