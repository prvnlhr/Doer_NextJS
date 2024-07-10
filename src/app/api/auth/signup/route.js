import EmailTemplate from "@/components/Email/EmailTemplate";
import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import bcrypt from "bcrypt";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const generateOTP = async () => {
  // Generate a random 4-digit OTP
  const otp = Math.floor(1000 + Math.random() * 9000);

  // Get the current timestamp in milliseconds
  const currentTime = Date.now();

  // Set the OTP expiry time to 2 minutes (120 seconds)
  const expiryTime = currentTime + 120000;

  // Hash the OTP before saving it to the database
  const hashedOTP = await bcrypt.hash(otp.toString(), 10);

  // console.log(otp, hashedOTP, expiryTime);
  return { otp, hashedOTP, expiryTime };
};

const sendMail = async (email, otpDigits) => {
  console.log("STEP2.", otpDigits);
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "One Time Password",
      react: EmailTemplate({ otpDigits }),
    });
    if (error) {
      console.log(error);
      throw new Error(error);
    }
    return data;
  } catch (error) {
    console.log(error);
    // console.error("Error sending email:", JSON.stringify(error));
    // throw error;
    return error;
  }
};

// SIGNUP USER
export async function POST(req, res) {
  const { fullname, email, country } = await req.json();
  console.log("FFFFF.......", fullname, email, country);
  // return new Response(JSON.stringify("Sign Up Successful"), { status: 201 });
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
    console.log("OTPDIGIT.......", otpDigits);
    const emailRes = await sendMail(email, otpDigits);
    console.log(emailRes);

    return new Response(JSON.stringify("Sign Up Successful"), { status: 201 });
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
