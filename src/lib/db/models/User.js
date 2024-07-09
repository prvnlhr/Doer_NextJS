import mongoose from "mongoose";
import { string } from "yup";

const userSchema = new mongoose.Schema({
  fullname: { type: string, required: true },
  country: { type: string, required: true },
  otp: { type: string },
  otpExpiry: { type: Date },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
