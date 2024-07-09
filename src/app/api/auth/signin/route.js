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

const sendMail = async (email, optDigits) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "doerreact@gmail.com",
      to: email,
      subject: "Your OTP Code",
      react: EmailTemplate({ optDigits }),
    });
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export async function POST(req, res) {
  const { email } = await req.json();
  await dbConnect();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "Email does not exist" }), {
        status: 400,
      });
    }

    const { otp, hashedOTP, expiryTime } = await generateOTP();

    user.otp = hashedOTP;
    user.otpExpiry = expiryTime;
    await user.save();

    const optDigits = otp.toString().split("").map(Number);
    await sendMail(email, optDigits);

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
