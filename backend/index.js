import app from "./server.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
var port = process.env.PORT || 8001;
mongoose.connect(process.env.TASKOVER_URI);

app.listen(port, () => {
  console.log(`listening on localhost: ${port}`);
});
