const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(express.json());

// Serve static files
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));

// HTML routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API routes
// Add API routes here

//Start the server
app.listen(PORT, () => {
  console.log(`Server running on HTTP://localhost:${PORT}`);
});
