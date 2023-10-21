const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Middleware for parsing JSON data
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Route setups

// Route for serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(__dirname, '/public/index.html');
});

// Route for serving the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Route to read all saved notes
app.get('public/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// Route to save a new note
app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNote = { ...req.body, id: uuidv4() };
    notes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// Route to delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    fs.writeFile(
      './db/db.json',
      JSON.stringify(updatedNotes, null, 2),
      (err) => {
        if (err) throw err;
        res.json({ message: 'Note deleted successfully' });
      }
    );
  });
});
