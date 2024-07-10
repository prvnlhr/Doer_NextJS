import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import EmailTemplate from "@/components/Email/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

const generateOTP = async () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const currentTime = Date.now();
  const expiryTime = currentTime + 120000;
  const hashedOTP = await bcrypt.hash(otp.toString(), 10);
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

export async function POST(req, res) {
  const { email } = await req.json();
  console.log("EMAIL", email);
  await dbConnect();

  try {
    let query = {
      email: email,
    };
    const user = await User.findOne(query);

    if (!user) {
      return new Response(JSON.stringify({ message: "Email does not exist" }), {
        status: 400,
      });
    }

    const { otp, hashedOTP, expiryTime } = await generateOTP();

    user.otp = hashedOTP;
    user.otpExpiry = expiryTime;
    await user.save();

    console.log("OTP", otp);

    const otpDigits = otp.toString().split("").map(Number);
    await sendMail(email, otpDigits);

    return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return new Response(
      JSON.stringify({ error: error.message, message: "Error in sign-in" }),
      { status: 500 }
    );
  }
}
