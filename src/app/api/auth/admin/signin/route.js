import User from "@/doer-rough";
import dbConnect from "@/lib/db/dbConnect";
import { sendOTPEmail } from "@/lib/utils/sendMail";
import bcrypt from "bcrypt";

const generateOTP = async () => {
  const otp = Math.floor(10000 + Math.random() * 90000);
  const currentTime = Date.now();
  const expiryTime = currentTime + 120000;
  const hashedOTP = await bcrypt.hash(otp.toString(), 10);
  return { otp, hashedOTP, expiryTime };
};

// SIGNIN USER
export async function POST(req) {
  // console.log("req", req);
  const { email } = await req.json();
  // console.log("email", email);
  await dbConnect();
  try {
    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
      });
    }
    let query = {
      email: email,
    };

    const user = await User.findOne(query);

    if (!user) {
      console.log("Email does not exist");
      return new Response(JSON.stringify({ message: "Email does not exist" }), {
        status: 400,
      });
    }
    // -----------------------------------------------------
    const isAuthorized = user.role === "admin";

    if (!isAuthorized) {
      console.log("Admin Sign-in : Admin access denied for this email");
      return new Response(
        JSON.stringify({ message: "Admin access denied for this email" }),
        {
          status: 400,
        }
      );
    }

    const currentTime = new Date();
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);

    if (user.otpRequestCount >= 3 && user.lastOtpRequestAt > oneHourAgo) {
      return new Response(
        JSON.stringify({ message: "Too many requests. Try again in 1 hour." }),
        { status: 429 }
      );
    }

    // Reset OTP request count if the last request was more than an hour ago
    if (user.lastOtpRequestAt <= oneHourAgo) {
      user.otpRequestCount = 0;
    }

    // -----------------------------------------------------

    const { otp, hashedOTP, expiryTime } = await generateOTP();
    user.otp = hashedOTP;
    user.otpExpiry = expiryTime;
    await user.save();

    const otpDigits = otp.toString().split("").map(Number);

    const emailRes = await sendOTPEmail(email, otpDigits);

    if (
      emailRes.success &&
      emailRes?.message === "OTP email sent successfully."
    ) {
      return new Response(
        JSON.stringify({ message: "OTP sent successfully" }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Error sending OTP email" }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    return new Response(
      JSON.stringify({ error: error.message, message: "Error in sign-in" }),
      { status: 500 }
    );
  }
}
