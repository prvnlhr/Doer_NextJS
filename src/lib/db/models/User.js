import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] }, // Add role field with default value and enum
    otp: { type: String },
    otpExpiry: { type: Date },
    otpRequestCount: { type: Number, default: 0 },
    lastOtpRequestAt: { type: Date },
  },
  { timestamps: true }
);

// Middleware to update OTP request count and timestamp before saving user
UserSchema.pre("save", function (next) {
  const demoEmail = process.env.NEXT_PUBLIC_DEMO_LOGIN_ID;

  // Check if the user is not the demo account
  if (this.email !== demoEmail && this.isModified("otp")) {
    // Increment OTP request count and update last OTP request timestamp
    this.otpRequestCount++;
    this.lastOtpRequestAt = new Date();
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
