import express from "express";
import cors from "cors";
import index from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT);
app.use(express.json());
app.use("/", index);
app.use("*", (req, res) => res.status(404).json({ ERROR: "Not Found" }));
export default app;
