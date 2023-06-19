import mongoose, { Schema } from "mongoose";
var taskSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true, collection: "tasks" }
);
export default mongoose.model("tasks", taskSchema);
