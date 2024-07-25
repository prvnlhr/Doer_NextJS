import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import { sendOTPEmail } from "@/lib/utils/sendMail";
import bcrypt from "bcrypt";

const generateOTP = async () => {
  const otp = Math.floor(10000 + Math.random() * 90000);
  const currentTime = Date.now();
  const expiryTime = currentTime + 120000;
  const hashedOTP = await bcrypt.hash(otp.toString(), 10);
  return { otp, hashedOTP, expiryTime };
};

// const generateOTP = async () => {
//   console.log("100 years OTP");
//   const otp = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit OTP
//   const hashedOTP = await bcrypt.hash(otp.toString(), 10); // Hash the OTP (optional, based on your needs)

//   // Set a very large expiry time (e.g., 100 years from now)
//   const currentTime = Date.now();
//   const expiryTime = currentTime + 100 * 365 * 24 * 60 * 60 * 1000; // 100 years in milliseconds

//   return { otp, hashedOTP, expiryTime };
// };

// SIGNUP USER
export async function POST(req, res) {
  const { fullname, email, country } = await req.json();
  // console.log("sign up user", fullname, email);

  // return new Response(JSON.stringify({ message: "Error in  Signup" }), {
  //   status: 500,
  // });
  await dbConnect();
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 400,
      });
    }

    const { otp, hashedOTP, expiryTime } = await generateOTP();

    const newUser = await User.create({
      fullname,
      email,
      country,
      otp: hashedOTP,
      otpExpiry: expiryTime,
    });

    const otpDigits = otp.toString().split("").map(Number);
    const emailRes = await sendOTPEmail(email, otpDigits);
    if (
      emailRes.success &&
      emailRes?.message === "OTP email sent successfully."
    ) {
      return new Response(JSON.stringify({ message: "Sign Up Successful" }), {
        status: 201,
      });
    } else {
      return new Response(
        JSON.stringify({ message: "Error sending OTP email" }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: error, message: "Error in  Signup" }),
      {
        status: 500,
      }
    );
  }
}
