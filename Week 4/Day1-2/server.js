const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const processedMessages = new Set();

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("message", (data) => {
    const { id, text } = data;

    // Idempotency Check
    if (processedMessages.has(id)) {
      console.log("Duplicate Message Ignored");
      return;
    }

    processedMessages.add(id);

    console.log("Saved:", text);

    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server Running on Port 5000");
});