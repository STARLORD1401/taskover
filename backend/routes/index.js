import express from "express";
import users from "./users.js";
import tasks from "./tasks.js";
var app = express();
app.get("/", (req, res) => {
  res.send("YAY");
});
app.use("/users", users);
app.use("/tasks", tasks);
export default app;
