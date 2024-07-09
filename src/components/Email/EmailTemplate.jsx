import React from "react";

const EmailTemplate = ({ otpDigits }) => {
  return (
    <div style="max-width: 400px; margin: 0 auto; padding: 15px; background-color: #1A212D; border-radius: 0px; backdrop-filter: blur(10px); box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3); margin-top: 20px; overflow: hidden;">
      <div style="text-align: center; padding: 20px 0;">
        <h1 style="color: #9E77ED; margin: 0; text-align:center ; font-size: 24px;">
          DO.er
        </h1>
      </div>
      <div style="text-align: center; padding: 10px;">
        <table cellspacing="0" cellpadding="0" border="0" align="center">
          <tr>
            <td style="border: 2px solid #9E92DC; border-radius: 15px; width: 50px; height: 50px; font-size: 20px; font-weight: bold; background-color: rgba(158, 146, 220, 0.2); text-align: center;">
              ${otpDigits[0]}
            </td>
            <td style="width: 5px;"></td>
            <td style="border: 2px solid #9E92DC; border-radius: 15px; width: 50px; height: 50px; font-size: 20px; font-weight: bold; background-color: rgba(158, 146, 220, 0.2); text-align: center;">
              ${otpDigits[1]}
            </td>
            <td style="width: 5px;"></td>
            <td style="border: 2px solid #9E92DC; border-radius: 15px; width: 50px; height: 50px; font-size: 20px; font-weight: bold; background-color: rgba(158, 146, 220, 0.2); text-align: center;">
              ${otpDigits[2]}
            </td>
            <td style="width: 5px;"></td>
            <td style="border: 2px solid #9E92DC; border-radius: 15px; width: 50px; height: 50px; font-size: 20px; font-weight: bold; background-color: rgba(158, 146, 220, 0.2); text-align: center;">
              ${otpDigits[3]}
            </td>
          </tr>
        </table>
        <p style="color: white; font-size: 14px; margin-top: 10px;">
          Use the above OTP to authenticate in your DO.er account.
        </p>
        <p style="color: white; font-size: 14px;">
          This OTP will expire in 2 minutes.
        </p>
        <p style="color: white; font-size: 14px;">
          If you didn't request this OTP, please ignore this email.
        </p>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #888;">
        <p>&copy; 2023 DO.er. All rights reserved.</p>
      </div>
    </div>
  );
};

export default EmailTemplate;
