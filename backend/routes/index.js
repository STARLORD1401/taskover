import express from "express";
import users from "./users.js";
var app = express();
app.get("/", (req, res) => {
  res.send("YAY");
});
app.use("/users", users);
export default app;
