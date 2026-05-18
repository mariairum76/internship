const express = require("express");

const app = express();

// Home Route
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

// About Route
app.get("/about", (req, res) => {
  res.send("ABOUT PAGE");
});

// Contact Route
app.get("/contact", (req, res) => {
  res.send("CONTACT PAGE");
});

// Server Start
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});