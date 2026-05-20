import express from "express";

import taskRoutes from "./routes/taskroutes";

const app = express();

app.use(express.json());

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});