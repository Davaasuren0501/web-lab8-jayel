import mongoose, { mongo } from "mongoose";
const randtoken = require("rand-token");
const SessionSchema = new mongoose.Schema(
  {
    token: { type: String, default: randtoken.generate(64) },
    _user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
export default mongoose.models.Session ||
  mongoose.model("Session", SessionSchema);
