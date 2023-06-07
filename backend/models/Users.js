import mongoose from "mongoose";
var userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, collection: "users" }
);
export default mongoose.model("users", userSchema);
