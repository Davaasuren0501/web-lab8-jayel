import mongoose, { mongo } from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 30 },
    surname: { type: String, required: true, maxLength: 30 },
    age: { type: Number, required: true },
    email: { type: String, required: true, maxLength: 35 },
    password: {
      type: String,
      required: true,
      maxLength: 50,
    },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
