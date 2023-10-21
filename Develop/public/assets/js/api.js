const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Retrieve all notes
router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err),
        res.status(500).json({ error: 'Failed to retrieve notes' });
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

// Save a new note
router.post('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save note' });
    } else {
      const notes = JSON.parse(data);
      const newNote = req.body;
      newNote.id = Date.now().toString();
      notes.push(newNote);
      fs.writeFile(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to save note' });
          } else {
            res.json(newNote);
          }
        }
      );
    }
  });
});

// Delete a note
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete note' });
    } else {
      const notes = JSON.parse(data);
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      fs.writeFile(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(updatedNotes),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete note' });
          } else {
            res.sendStatus(204);
          }
        }
      );
    }
  });
});

module.exports = router;
