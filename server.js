const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Log every incoming request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Read JSON data sent by clients
app.use(express.json());

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Receive user details
app.post("/user", (req, res) => {
  const { name, email } = req.body || {};

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim()
  ) {
    return res.status(400).json({
      error: "Name and email are required."
    });
  }

  res.send(`Hello, ${name.trim()}!`);
});

// User profile
app.get("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});