import mongoose, { Schema } from "mongoose";
const Schema = mongoose.Schema;
var taskSchema = new Schema(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    title: { type: String, required: true },
    description: { type: String, required: true },
    complete: { type: Boolean },
  },
  { timestamps: true, collection: "tasks" }
);
export default mongoose.model("tasks", taskSchema);
