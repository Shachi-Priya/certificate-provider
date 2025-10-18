import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  course: { type: String, required: true },
  issuedOn: { type: Date, required: true },
  certificateUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);