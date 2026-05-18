const express = require("express");
const app = express();

// normal route
app.get("/", (req, res) => {
  res.send("Home Page");
});

// error route
app.get("/error", (req, res) => {
  throw new Error("Something went wrong!");
});

// global error handler
const errorHandler = (err, req, res, next) => {
  console.log("Error caught:", err.message);

  res.status(500).json({
    success: false,
    message: err.message,
  });
};

app.use(errorHandler);

app.listen(3002, () => {
  console.log("Server running");
});