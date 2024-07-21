import nodemailer from "nodemailer";

const { GMAIL_ID, GMAIL_PASS, SENDER_EMAIL } = process.env;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_ID,
    pass: GMAIL_PASS,
  },
});

export const sendOTPEmail = async (to, otpDigits) => {
  const mailOptions = {
    from: SENDER_EMAIL,
    to: to,
    subject: "One Time Password",
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DO.er - Authentication OTP</title>
            <style>
              body {
                font-family: 'Inter', Arial, sans-serif;
                background-color: #0D1321;
                color: white;
                margin: 0;
                padding: 0;
                padding-left: 20px;
                padding-right: 20px;
              }
              .email-container {
                max-width: 400px;
                margin: 0 auto;
                padding: 15px;
                background-color: #1A212D;
                border-radius: 0px;
                backdrop-filter: blur(10px);
                box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
                margin-top: 20px;
                overflow: hidden;
              }
              .header {
                text-align: center;
                padding: 20px 0;
              }
              .otp-table {
                border-spacing: 0;
                border-collapse: collapse;
                margin: 0 auto;
              }
              .otp-cell {
                border: 2px solid #9E92DC;
                border-radius: 15px;
                width: 50px;
                height: 50px;
                font-size: 20px;
                font-weight: bold;
                background-color: rgba(158, 146, 220, 0.2);
                text-align: center;
              }
              .otp-text {
                color: white;
                font-size: 14px;
                margin-top: 10px;
              }
              .expiration-text {
                color: white;
                font-size: 14px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #888;
              }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1 style="color: #9E77ED; margin: 0; text-align:center ; font-size: 24px;">DO.er</h1>
                </div>
                <div style="text-align: center; padding: 10px;">
                    <table class="otp-table">
                        <tr>
                            ${otpDigits
                              .map(
                                (digit) => `<td class="otp-cell">${digit}</td>`
                              )
                              .join("")}
                        </tr>
                    </table>
                    <p class="otp-text">Use the above OTP to authenticate in your DO.er account.</p>
                    <p class="expiration-text">This OTP will expire in 2 minutes.</p>
                    <p class="expiration-text">If you didn't request this OTP, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2023 DO.er. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`,
  };

  try {
    const mailRes = await transport.sendMail(mailOptions);
    return { success: true, message: "OTP email sent successfully.", mailRes };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Error sending OTP email.");
  }
};
