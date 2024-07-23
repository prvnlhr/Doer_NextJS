import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { authConfig } from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          await dbConnect();

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with the email");
          }

          if (user.otpExpiry && new Date(user.otpExpiry) < new Date()) {
            throw new Error("OTP has expired. Try signing in again.");
          }

          const isOtpValid = await bcryptjs.compare(credentials.otp, user.otp);
          if (!isOtpValid) {
            throw new Error("Invalid OTP");
          }
          const isDemoAccount = user.email === process.env.NEXT_DEMO_LOGIN_ID;

          if (!isDemoAccount) {
            user.otp = null;
            user.otpExpiry = null;
            await user.save();
          }

          return {
            userId: user._id,
            email: user.email,
            name: user.fullname,
            country: user.country,
          };
        } catch (error) {
          console.error("Error authorizing user:", error.message);
          throw new Error(`Authorization failed: ${error.message}`);
        }
      },
    }),
  ],
});
