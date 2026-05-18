const express = require("express");
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Request URL:", req.url);
  next(); // next() hona zaroori hai
});

// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Server start
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});