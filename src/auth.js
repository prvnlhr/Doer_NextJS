import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { auth, handlers, signIn, signOut } = NextAuth({
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

          const isOtpValid = await bcrypt.compare(credentials.otp, user.otp);
          if (!isOtpValid) {
            throw new Error("Invalid OTP");
          }

          return {
            userId: user._id,
            email: user.email,
            name: user.fullname,
            country: user.country,
          };
        } catch (error) {
          console.error("Error authorizing user:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/verifyotp",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.email = user.email;
        token.name = user.name;
        token.country = user.country;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
});