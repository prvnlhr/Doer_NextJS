import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      authorize: async (credentials) => {
        await dbConnect();
        const user = User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with the email");
        }
        if (user.otpExpiry && user.otpExpiry < Date.now()) {
          throw new Error("OTP has expired. Try signing again");
        }
        const isOtpValid = await bcrypt.compare(credentials.otp, user.otp);
        if (!isOtpValid) {
          throw new Error("Invalid OTP");
        }

        return { email: user.email, name: user.fullName };
      },
    }),
  ],
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(dbConnect),
});
