import app from "./server.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
mongoose.connect(process.env.TASKOVER_URI).then(
  app.listen(process.env.PORT, () => {
    console.log(
      `connected to db & listening on localhost: ${process.env.PORT}`
    );
  })
);
