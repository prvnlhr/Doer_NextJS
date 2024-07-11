import EmailTemplate from "@/components/Email/EmailTemplate";
import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import sendMail from "@/lib/utils/sendMail";
import bcrypt from "bcrypt";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const generateOTP = async () => {
  const otp = Math.floor(10000 + Math.random() * 90000);
  const currentTime = Date.now();
  const expiryTime = currentTime + 120000;
  const hashedOTP = await bcrypt.hash(otp.toString(), 10);
  return { otp, hashedOTP, expiryTime };
};



// SIGNUP USER
export async function POST(req, res) {
  const { fullname, email, country } = await req.json();
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
    await sendMail(email, otpDigits);
    return new Response(JSON.stringify({ message: "Sign Up Successful" }), {
      status: 201,
    });
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
