import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose?.models?.User || mongoose.model("User", userSchema);

export default User;
